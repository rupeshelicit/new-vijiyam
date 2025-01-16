import React, { useState, useCallback } from "react";
import { Form, Button, Progress } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import usePost from "hooks/usePost";
import { UPLOAD_VOTER_EXCEL } from "constants/api";

export default function ExcelUpload ()
{
  const [ files, setFiles ] = useState( [] );
  const [ uploadingFile, setUploadingFile ] = useState( null );
  const [ uploadedFile, setUploadedFile ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  const { mutateAsync: uploadExcelFile } = usePost();
  const loginUser = JSON.parse( localStorage.getItem( "userDetails" ) );
  const [ form ] = Form.useForm();

  const updateProgress = ( file ) =>
  {
    const interval = setInterval( () =>
    {
      setFiles( ( prevFiles ) =>
        prevFiles.map( ( f ) =>
          f.name === file.name && f.progress < 100
            ? { ...f, progress: f.progress + 20 }
            : f
        )
      );
    }, 500 );

    setTimeout( () =>
    {
      clearInterval( interval );
      setUploadingFile( null );
      setUploadedFile( file.name );
    }, 3000 );
  };

  const simulateFileUpload = ( file ) =>
  {
    setUploadingFile( file.name );
    updateProgress( file );
  };

  const onDrop = useCallback( ( acceptedFiles ) =>
  {
    const newFiles = acceptedFiles.map( ( file ) => ( {
      name: file.name,
      raw: file, // Save the raw file object
      progress: 0,
    } ) );
    setFiles( ( prev ) => [ ...prev, ...newFiles ] );
    newFiles.forEach( simulateFileUpload );
  }, [] );

  const removeFile = ( fileName ) =>
  {
    setFiles( ( prev ) => prev.filter( ( file ) => file.name !== fileName ) );
    if ( uploadingFile === fileName ) setUploadingFile( null );
    if ( uploadedFile === fileName ) setUploadedFile( null );
  };

  const handleUpload = async () =>
  {
    if ( files.length === 0 )
    {
      console.warn( "No files to upload." );
      return;
    }

    const formData = new FormData();

    // Append each file to the FormData object
    files.forEach( ( file ) =>
    {
      formData.append( "excelFile", file.raw ); // Use the raw file object
    } );

    formData.append( "createdBy", loginUser.id );

    try
    {
      setLoading( true );
      const response = await uploadExcelFile( {
        url: UPLOAD_VOTER_EXCEL,
        type: "details",
        payload: formData,
        token: true,
        file: true,
      } );
      if ( response ) console.log( "Files uploaded successfully", response );
    } catch ( err )
    {
      console.error( "Error uploading files:", err );
    } finally
    {
      setLoading( false );
    }
  };

  const { getRootProps, getInputProps } = useDropzone( {
    onDrop,
    accept: {
      "application/vnd.ms-excel": [ ".xls" ],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: true,
  } );

  return (
    <div className="single-excel-upload-content mt-[30px]">
      <h3 className="head text-[20px] font-semibold text-[#54408c]">
        Upload Voter List
      </h3>

      <Form form={ form } layout="vertical" onFinish={ handleUpload }>
        <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
          <Form.Item>
            <div { ...getRootProps() } className="bg-white hover:bg-gray-50 transition-colors">
              <div className="border-2 border-dashed border-[#54408C] rounded-lg p-8 cursor-pointer">
                <input { ...getInputProps() } />
                <div className="text-center">
                  <InboxOutlined className="text-4xl text-[#54408C]" />
                  <p className="text-[#54408C] mt-2">
                    Drag & drop files or <span className="underline">Browse</span>
                  </p>
                  <p className="text-sm text-gray-500">Supported formats: Excel</p>
                </div>
              </div>
            </div>
          </Form.Item>

          { files.length > 0 && (
            <div className="uploaded-files-section">
              { files.map( ( file ) => (
                <div key={ file.name } className="uploaded-file bg-white border border-green-500 rounded-md mb-5 p-[5px] flex justify-between items-center max-w-[445px]">
                  <span className="text-gray-800 font-medium">{ file.name }</span>
                  <Button
                    type="text"
                    icon={ <CloseOutlined /> }
                    onClick={ () => removeFile( file.name ) }
                    className="text-red-500 hover:text-red-700"
                    disabled={ uploadingFile === file.name }
                  />
                </div>
              ) ) }
            </div>
          ) }

          { uploadingFile && (
            <div className="upload-progress mb-4 max-w-[445px]">
              <Progress
                percent={ files.find( ( file ) => file.name === uploadingFile )?.progress || 0 }
                size="small"
                status="active"
                strokeColor="#52c41a"
              />
              <label className="block text-gray-700 mt-2">
                Uploading: { uploadingFile }
              </label>
            </div>
          ) }
        </div>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] max-w-[200px]"
            style={ { width: "100%" } }
            onMouseEnter={ ( e ) => ( e.currentTarget.style.backgroundColor = "#432C6A" ) }
            onMouseLeave={ ( e ) => ( e.currentTarget.style.backgroundColor = "#54408C" ) }
          >
            Submit Sheet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
