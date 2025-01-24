import React, { useEffect, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { VoterListSection } from "styles/pages/ClientAdmin/Voter/index";
import deleteIcon from "assets/svg/trans-icon.svg";
import ExcelIcons from "assets/svg/excelIcons";
import PlusIcons from "assets/svg/plusIcons";
import { columns } from "./dummyData";
import { data } from "./dummyData";
import TableComponent from "components/common/Table";
import VoterFilter from "components/common/FiltersComponent";
import AddNewVoters from "./addNewModal";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportToExcel from "components/common/ExportToExcel";
import useGet from "hooks/useGet";
import { GET_VOTER_LIST } from "constants/api";
import ExcelColumn from "Data/DummyDataExcelColum";

const VoterList = () =>
{
  const [ activeButton, setActiveButton ] = useState( "addNewVoter" );
  const [ addNewVoters, setAddNewVoters ] = useState( false );
  const [ voterData, setVoterData ] = useState( [] );
  const [ openExportDrawer, setOpeExportDrawer ] = useState( false );
  const loginUsers = JSON.parse( localStorage.getItem( "userDetails" ) );
  const { mutateAsync: GetVoterList } = useGet();
  const [ currentPage, setCurrentPage ] = useState( 1 );

  // handleButtonClick to manage active button state
  const handleButtonClick = ( button ) =>
  {
    setActiveButton( button );
  };

  // handleBlankExcel to open export drawer
  const handleBlankExcel = () =>
  {
    setOpeExportDrawer( true );
  };

  // handleAddnewVoter to open add new voter modal
  const handleAddnewVoter = () =>
  {
    setAddNewVoters( true );
  };

  // Row selection logic for multi-select checkboxes
  const rowSelection = {
    onChange: ( selectedRowKeys, selectedRows ) =>
    {
      console.log( "Selected Row Keys:", selectedRowKeys );
      console.log( "Selected Rows:", selectedRows );
    },
  };

  // Function to fetch voter list with pagination
  const getVoterList = async ( page, limit ) =>
  {
    const id = loginUsers.id;
    await GetVoterList( {
      url: `${ GET_VOTER_LIST + id }?page=${ page }&limit=${ limit }`,
      type: "details",
      token: true,
    } )
      .then( ( res ) =>
      {
        if ( res && res.items )
        {
          setVoterData( ( prevData ) => [ ...prevData, ...res.items ] );
        } else
        {
          // Handle the case when res or res.items is undefined
          console.log( "No items found in response" );
        }
      } )
      .catch( ( error ) => console.log( error ) );
  };

  // handleFilterSubmit to apply filters when the user submits the filter form
  const handleFilterSubmit = async ( filters ) =>
  {
    const id = loginUsers.id;
    const filterParams = new URLSearchParams( filters ).toString(); // Convert filters object to query string
    console.log( filters, "kfjhdudfk", filterParams );

    await GetVoterList( {
      url: `${ GET_VOTER_LIST + id }?${ filterParams }`,
      type: "details",
      token: true,
    } )
      .then( ( res ) =>
      {
        if ( res )
        {
          setVoterData( res?.items ); // Replace existing data with filtered data
        }
      } )
      .catch( ( error ) => console.log( error ) );
  };

  // Fetch voter list when currentPage changes
  useEffect( () =>
  {
    getVoterList( currentPage, 10 );
  }, [ currentPage ] );

  return (
    <VoterListSection>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">
          Voter Search List
        </h3>
        <div>
          <div className="votter-list-fillter">
            <VoterFilter onFilterSubmit={ handleFilterSubmit } />
          </div>
          <div className="voter-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">Voter List</h3>
              <p className="text-[13px] font-medium text-[#667085]">
                Search list
              </p>
            </div>
            <div className="voter-search-list-buttons flex gap-[20px]">
              <div className="delete-button flex items-center">
                <button className="flex gap-[5px] items-center">
                  <img src={ deleteIcon } alt="Delete Icon" />
                  <span className="text-[13px] font-medium text-[#344054]">
                    Delete
                  </span>
                </button>
              </div>

              <div className="export-file">
                <ExportToExcel
                  data={ voterData }
                  columns={ columns }
                  Icons={ <ExcelIcons /> }
                  buttonText={ "Export" }
                  excelName="voterlist"
                />
              </div>

              <div className="export-file">
                <ExportToExcel
                  buttonText={ "Export Demo Excel" }
                  Icons={ <ExcelIcons /> }
                  columns={ ExcelColumn }
                  excelName="VoterDemo"
                />
              </div>

              <div className="add-new-voter">
                <ButtonComponent
                  text={ "Add new Voter" }
                  Icons={ <PlusIcons /> }
                  onClick={ handleAddnewVoter }
                />
              </div>
            </div>
            <TableComponent
              rowSelection={ rowSelection }
              columns={ columns }
              data={ voterData }
              setCurrentPage={ setCurrentPage }
            />
          </div>
        </div>
      </Container>
      <AddNewVoters
        setIsModalOpen={ setAddNewVoters }
        isModalOpen={ addNewVoters }
      />
      <ExportTable
        open={ openExportDrawer }
        setOpen={ setOpeExportDrawer }
        title={ "Select List Header" }
        data={ voterData }
        columns={ columns }
      />
    </VoterListSection>
  );
};

export default VoterList;
