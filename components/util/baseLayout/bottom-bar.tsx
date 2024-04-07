"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { GoHome, GoSearch, GoBell, GoHistory } from "react-icons/go";

export const BottomBar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="absolute bottom-0 z-50 max-w-2xl w-full h-[50px] flex justify-between items-center px-10  gap-10 bg-transparent">
            <Link href="/home">
                <GoHome size={18} />
            </Link>
            <Link href="/menu">
                <GoSearch size={18} />
            </Link>
            <Link href="/notification">
                <GoBell size={18} />
            </Link>
            <Link href="/history">
                <GoHistory size={18} />
            </Link>
        </div>
    );
};
