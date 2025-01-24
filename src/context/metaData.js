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
  const [custmerDetails, setCustmerDetails] = useState({});
  const [deleteStates, setDeleteStates] = useState({
    election: false,
    voter: false,
  });
  const [updateStatus, setUpdateStatus] = useState({
    election: false,
    voter: false,
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
  return (
    <MetaDataContext.Provider
      value={{
        custmerDetails,
        deleteStates,
        updateStatus,
        setCustmerDetails,
        updateDeleteState,
        setUpdateStatus,
        updateEditState,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
};

export const useMetaDataContext = () => useContext(MetaDataContext);
