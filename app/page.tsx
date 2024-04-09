"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { app } from "@/components/util/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function Home() {
    const { setUser } = useContext(AppContext);
    const router = useRouter();
    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("success", user.email);
                user.email && setUser(user.email);
                router.push("/home");
            } else {
                console.log("error");
                router.push("/login");
            }
        });
    }, []);
    return <>{}</>;
}
