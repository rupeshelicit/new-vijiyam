import React, { createContext, useContext, useState } from "react";

const contextDefaultValues = {
  custmerDetails: {},
  setCustmerDetails: (data) => data,
};

const MetaDataContext = createContext(contextDefaultValues);

export const MetaDataProvider = ({ children }) => {
  const [custmerDetails, setCustmerDetails] = useState(
    contextDefaultValues.custmerDetails
  );
  const [isDelteElection, setDelteElection] = useState(false);
  return (
    <MetaDataContext.Provider
      value={{
        custmerDetails,
        isDelteElection,
        setCustmerDetails,
        setDelteElection,
      }}

      
    >
      {children}
    </MetaDataContext.Provider>
  );
};

export default () => useContext(MetaDataContext);
