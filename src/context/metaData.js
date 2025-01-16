import React, { createContext, useContext, useState } from 'react'

const contextDefaultValues = {
    custmerDetails: {},
    setCustmerDetails: (data) => data
}

const MetaDataContext = createContext(contextDefaultValues)

export const MetaDataProvider = ({ children }) => {
    const [custmerDetails, setCustmerDetails] = useState(contextDefaultValues.custmerDetails);

    return (
        <MetaDataContext.Provider
            value={{
                custmerDetails,
                setCustmerDetails
            }}
        >
            {children}
        </MetaDataContext.Provider>
    )
}

export default () => useContext(MetaDataContext)
