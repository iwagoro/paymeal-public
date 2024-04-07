"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
export default function Home() {
    const { user } = useContext(AppContext);
    return <>{}</>;
}
