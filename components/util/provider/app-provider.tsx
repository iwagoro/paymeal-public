"use client";

import { useState, createContext, useEffect } from "react";
import { getMenus } from "../../../lib/db-util";
import { menuProps, userDataProps } from "../../../lib/interface";
import { app } from "../../../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../../lib/db-util";
import { useRouter } from "next/navigation";

export const AppContext = createContext(
    {} as {
        user: userDataProps;
        setUser: React.Dispatch<React.SetStateAction<userDataProps>>;
        menus: menuProps[];
        setMenus: React.Dispatch<React.SetStateAction<menuProps[]>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userDataProps>({} as userDataProps);
    const [menus, setMenus] = useState<menuProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userData = await getUserData(user.email || "");
                    setUser(userData as userDataProps);
                } else {
                    setUser({} as userDataProps);
                    router.push("/login");
                }
            });
            return unsubscribe;
        };
        fetchData();
    }, []);

    const contextValue = { user, setUser, menus, setMenus };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
