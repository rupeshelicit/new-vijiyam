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
  const [deleteVoter, setDeleteVoters] = useState(
    contextDefaultValues.deleteVoter
  );
  return (
    <MetaDataContext.Provider
      value={{
        custmerDetails,
        setCustmerDetails,
        deleteVoter,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
};

export default () => useContext(MetaDataContext);
