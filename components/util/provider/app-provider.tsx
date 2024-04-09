"use client";

import { useState, createContext, useEffect } from "react";
import { getMenus } from "../db-util";

export const AppContext = createContext(
    {} as {
        user: string;
        setUser: (user: string) => void;
    }
);

interface menuProps {
    name: string;
    price: number;
    stock: number;
    content: string[];
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string>("test");
    const [menus, setMenus] = useState<[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await getMenus();
        };
        fetchData();
    }, [user]);

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
