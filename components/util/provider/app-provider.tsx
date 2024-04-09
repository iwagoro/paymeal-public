"use client";

import { useState, createContext } from "react";

export const AppContext = createContext(
    {} as {
        user: string;
        setUser: (user: string) => void;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string>("test");

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
