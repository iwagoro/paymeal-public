"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu } from "@/components/util/baseLayout/menu";

export const TopBar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="absolute top-0  z-50 max-w-2xl w-full h-[50px] flex justify-between items-center px-10  gap-10 bg-transparent">
            <Link href="/home">
                <div className="flex gap-4 items-center bg-transparent">
                    <svg width="24" height="24" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_2)">
                            <path d="M120 149C120 140.163 127.163 133 136 133H262.242C277.879 133 285.222 152.332 273.528 162.713L146.622 275.368C136.301 284.529 120 277.203 120 263.402V149Z" fill={theme === "dark" ? "white" : "black"} />
                            <path d="M26.5604 271.049C20.0146 284.345 0 279.686 0 264.866V15C0 6.71573 6.71573 0 15 0H160H194.58C198.082 0 201.475 1.24496 204.168 3.51901L274.589 62.9705C278.017 65.8649 280 70.1581 280 74.6859V102.784C280 115.546 265.076 122.478 255.324 114.245L162.726 36.0709C155.449 29.9273 144.348 32.1518 140 40.625L120 81.25L80 162.5L26.5604 271.049Z" fill={theme === "dark" ? "white" : "black"} />
                        </g>
                        <defs>
                            <clipPath id="clip0_5_2">
                                <rect width="280" height="280" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Paymeal</h2>
                </div>
            </Link>
            <Menu />
        </div>
    );
};
