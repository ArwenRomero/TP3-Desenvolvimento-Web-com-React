import React, { createContext, useState } from 'react';

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
    const [records, setRecords] = useState({
        fralda: [],
        sono: [],
        amamentacao: [],
    });

    const addRecord = (type, record) => {
        setRecords((prevRecords) => ({
            ...prevRecords,
            [type]: [...prevRecords[type], record],
        }));
    };

    return (
        <RecordContext.Provider value={{ records, addRecord }}>
            {children}
        </RecordContext.Provider>
    );
};
