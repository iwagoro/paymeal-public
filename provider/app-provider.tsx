"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/apiHandler";
import { UserType } from "@/lib/types";
import { PushSpinner } from "react-spinners-kit";

export const AppContext = createContext(
    {} as {
        user: UserType;
        setUser: React.Dispatch<React.SetStateAction<UserType>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType>({} as UserType);
    const [authStatus, setAuthStatus] = useState<0 | 1 | 2>(0); // 0: loading, 1: login, 2: logout
    const router = useRouter();

    const getUser = async (token: string) => {
        try {
            apiRequest({
                method: "GET",
                endpoint: "/api/user",
                token: token,
            }).then((data) => {
                setUser({ ...data, token } as UserType);
                setAuthStatus(1);
            });
        } catch {
            setAuthStatus(0);
            router.push("/auth");
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            //?　ログイン
            if (user) {
                const token = await getIdToken(user);
                const userInfo = await getUser(token);
                //? ログアウト
            } else {
                setUser({} as UserType);
                setAuthStatus(2);
                router.push("/auth");
            }
        });
    }, []);

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{authStatus == 0 ? <PushSpinner size={50} color="crimson" /> : children}</AppContext.Provider>;
};
