"use client";
import Link from "next/link";
import { GoHome, GoSearch, GoBell } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

//! リンクのボタン
const NavLink = ({ to, icon, active }: { to: string; icon: React.ReactNode; active: boolean }) => (
    <Link href={to}>
        <div className={active ? "text-primary" : ""}>{icon}</div>
    </Link>
);

//! ボトムバー
export const BottomBar = () => {
    const [page, setPage] = useState("home");
    const param = usePathname();

    useEffect(() => {
        setPage(param.split("/")[1] || "home");
    }, [param]);

    const navItems = [
        { path: "home", icon: <GoHome size={18} /> },
        { path: "tickets", icon: <GoSearch size={18} /> },
        { path: "orders", icon: <GoBell size={18} /> },
        { path: "cart", icon: <IoBagOutline size={18} /> },
    ];

    return (
        <div className="absolute bottom-0 z-50 w-full h-[50px] flex justify-center items-center px-10 bg-[#fafafb]">
            <div className="w-full h-full max-w-2xl flex justify-between items-center  gap-10">
                {navItems.map((item) => (
                    <NavLink key={item.path} to={`/${item.path}`} icon={item.icon} active={page === item.path} />
                ))}
            </div>
        </div>
    );
};
