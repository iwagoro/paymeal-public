"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { GoHome, GoSearch, GoBell, GoHistory } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppContext } from "../provider/app-provider";
import { useContext } from "react";
export const BottomBar = () => {
    const { theme, setTheme } = useTheme();
    const [page, setPage] = useState("home");
    const { user } = useContext(AppContext);

    const param = usePathname();

    useEffect(() => {
        console.log(param);
        setPage(param.split("/")[1]);
    }, [param]);
    return (
        <>
            {user ? (
                <div className="absolute bottom-0 z-50 max-w-2xl w-full h-[50px] flex justify-between items-center px-10  gap-10 bg-background">
                    <Link href="/home" className={page === "home" ? "text-primary" : ""}>
                        <GoHome size={18} />
                    </Link>
                    <Link href="/menu" className={page === "menu" ? "text-primary" : ""}>
                        <GoSearch size={18} />
                    </Link>
                    <Link href="/notification" className={page === "notification" ? "text-primary" : ""}>
                        <GoBell size={18} />
                    </Link>
                    <Link href="/bag" className={page === "bag" ? "text-primary" : ""}>
                        <IoBagOutline size={18} />
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
