import React, { createContext, useContext, useState } from "react";

// Create the context with default values
const MetaDataContext = createContext({
  custmerDetails: {},
  deleteStates: { election: false, voter: false },
  setCustmerDetails: () => {},
  updateDeleteState: () => {},
});

// Provider Component
export const MetaDataProvider = ({ children }) => {
  const [clientProfileData, setClientProfileData] = useState(null);

  const [custmerDetails, setCustmerDetails] = useState({});
  const [deleteStates, setDeleteStates] = useState({
    election: false,
    voter: false,
    client: false,
    distributor: false,
    karykarta: false,
  });
  const [updateStatus, setUpdateStatus] = useState({
    election: false,
    voter: false,
    client: false,
    distributor: false,
    karykarta: false,
  });
  const updateDeleteState = (key, value) => {
    setDeleteStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateEditState = (key, value) => {
    setUpdateStatus((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setClientProfile = (data) => {
    setClientProfileData(data);
  };

  return (
    <MetaDataContext.Provider
      value={{
        custmerDetails,
        deleteStates,
        updateStatus,
        clientProfileData,
        setCustmerDetails,
        updateDeleteState,
        setUpdateStatus,
        updateEditState,
        setClientProfile,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
};

export const useMetaDataContext = () => useContext(MetaDataContext);
