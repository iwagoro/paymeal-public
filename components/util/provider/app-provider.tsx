"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { useRouter } from "next/navigation";
import { userProps } from "@/lib/types";
import { getUserEmail } from "@/lib/appUtils";
export const AppContext = createContext(
    {} as {
        user: userProps;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userProps>({} as userProps);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                const email = await getUserEmail(token);
                setUser({ email, token });
                console.log(token);
            } else {
                router.push("/login");
            }
        });
    }, []);

    const contextValue = { user };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
