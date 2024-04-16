"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.push("/home");
    }, []);

    return <>{}</>;
}
