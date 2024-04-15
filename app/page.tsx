"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { app } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { userDataProps } from "@/lib/interface";
import { getUserData } from "@/lib/db-util";
export default function Home() {
    const { setUser } = useContext(AppContext);
    const router = useRouter();

    return <>{}</>;
}
