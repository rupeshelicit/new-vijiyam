import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import Navbar from "components/Navbar/PrivateNavbar";
import { MainSection } from "styles/components/common/Layout";
import SidebarData from "components/common/Sidebar/sidebardata";
import sideBarLogo from "assets/images/sidebar-logo.png";
import downArrow from "assets/svg/leftTorightArrow.svg";
import upArrow from "assets/svg/downArrowIcon.svg";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const PrivateLayout = ( { children } ) =>
{
  const navigate = useNavigate();
  const roleId = localStorage.getItem( "roleId" );
  const currentLocation = window.location.pathname;
  const [ collapsed, setCollapsed ] = useState( true );
  const [ activePath, setActivePath ] = useState( currentLocation );
  const [ expandedItems, setExpandedItems ] = useState( () =>
  {
    try
    {
      const storedIndex = localStorage.getItem( "lastExpandedIndex" );
      return storedIndex !== null ? parseInt( storedIndex, 10 ) : null;
    } catch ( error )
    {
      console.error( "Error reading from localStorage:", error );
      return null;
    }
  } );
  useEffect( () =>
  {
    try
    {
      if ( expandedItems !== null )
      {
        localStorage.setItem( "lastExpandedIndex", expandedItems );
      } else
      {
        localStorage.removeItem( "lastExpandedIndex" );
      }
    } catch ( error )
    {
      console.error( "Error writing to localStorage:", error );
    }
  }, [ expandedItems ] );
  const handleSidebarClick = ( index, hasChildren, event ) =>
  {
    if ( hasChildren )
    {
      event.stopPropagation();
      setExpandedItems( ( prev ) => ( prev === index ? null : index ) );
    } else
    {
      setExpandedItems( null );
      const path = SidebarData[ index ]?.path;
      if ( path ) setActivePath( path );
      navigate( path );
    }
  };
  const handleChildClick = ( path, event ) =>
  {
    event.stopPropagation();
    setActivePath( path );
    navigate( path );
  };
  const renderIcon = ( icon, title ) =>
    React.isValidElement( icon ) ? icon : <img src={ icon } alt={ title } />;
  const renderChildren = ( children, parentIndex ) =>
    children.map( ( child, index ) => (
      <div
        key={ `child-${ parentIndex }-${ index }` }
        className={ `py-2 px-2 cursor-pointer hover-links mb-2 ${ activePath === child.path ? "child-active" : ""
          }` }
        onClick={ ( e ) => handleChildClick( child.path, e ) }
      >
        <div className="flex items-center">
          <span className="icon">{ renderIcon( child.icon, child.title ) }</span>
          <span className="ml-2 text-base font-semibold">{ child.title }</span>
        </div>
      </div>
    ) );
  const renderSidebarItems = () =>
    SidebarData.map( ( data, index ) =>
    {
      if ( !data.roleId?.includes( roleId ) ) return null;
      const isExpanded = expandedItems === index;
      const isActive = activePath === data.path;
      return (
        <div key={ `sidebar-item-${ index }` } className="py-2 mb-1">
          <div
            className={ `flex items-center cursor-pointer px-4 py-2 relative hover-links ${ isActive ? "active" : isExpanded ? "active-parent" : ""
              }` }
            onClick={ ( e ) => handleSidebarClick( index, !!data.children, e ) }
          >
            <span className="icon">{ renderIcon( data.icons, data.title ) }</span>
            <span className="ml-2 font-semibold text-base">{ data.title }</span>
            { data.children && (
              <img
                src={ isExpanded ? upArrow : downArrow }
                className="h-4 w-4 absolute right-4"
                alt="Toggle"
              />
            ) }
          </div>
          { isExpanded && data.children && (
            <div className="pl-8 mt-2">
              { renderChildren( data.children, index ) }
            </div>
          ) }
        </div>
      );
    } );
  return (
    <MainSection>
      <Layout className="handle-sidebar">
        <Layout className="layout-composition">
          <div className="flex">
            {/* Sidebar */ }
            <div className="w-[310px] pt-5 pl-5 pr-4 [box-shadow:0px_2px_10px_0px_#0000002B] min-h-[100vh]">
              <div className="logo pb-16">
                <img src={ sideBarLogo } alt="Sidebar Logo" />
              </div>
              { renderSidebarItems() }
            </div>
            {/* Main Content */ }
            <div className="flex-1 w-[calc(100%_-310px)]">
              <Navbar collapsed={ collapsed } setCollapsed={ setCollapsed } />
              <Content
                className="mob-layout"
                style={ {
                  overflow: "auto",
                  margin: 0,
                  padding: "0 16px",
                  minHeight: 280,
                } }
              >
                { children }
              </Content>
            </div>
          </div>
        </Layout>
      </Layout>
    </MainSection>
  );
};
PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateLayout;