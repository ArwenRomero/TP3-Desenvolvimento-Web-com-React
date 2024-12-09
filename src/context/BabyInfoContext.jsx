import React, { createContext, useState } from 'react';

export const BabyInfoContext = createContext();

export const BabyInfoProvider = ({ children }) => {
    const [babyInfo, setBabyInfo] = useState({
        name: 'Lucas',
        weight: '2,34 Kg',
        length: 60,
    });

    return (
        <BabyInfoContext.Provider value={{ babyInfo, setBabyInfo }}>
            {children}
        </BabyInfoContext.Provider>
    );
};
