"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Large } from "@/components/ui/typography";
import { useTheme } from "next-themes";
import { MdBrightness2, MdBrightness5, MdMenu } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { logOut } from "../../../lib/auth";
import { useRouter } from "next/navigation";

export const Menu = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const sendLine = async () => {
        const response = await fetch(`http://localhost:3000/api/kazukidayo`);
        const data = await response.json();
        console.log("🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data", data);
    };
    return (
        <Sheet>
            <SheetTrigger>
                <MdMenu size={24} />
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-start items-start gap-5">
                <SheetHeader className="pb-5 border-b-[1px] border-border">
                    <SheetTitle className="flex justify-start items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                        </Avatar>
                        Test User
                    </SheetTitle>
                    <SheetDescription className="text-left">Currently the only user is a test user. We plan to implement authentication with a Google account sometime in the future.</SheetDescription>
                </SheetHeader>
                <SheetClose className="w-full flex flex-col gap-4  pb-5 border-b-[1px] border-border">
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer  ${theme === "dark" ? "text-white" : "text-black"}`}
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "dark" ? <MdBrightness5 size={24} /> : <MdBrightness2 size={24} />}
                        <Large>Change Color</Large>
                    </div>
                </SheetClose>
                <SheetClose className="w-full flex flex-col gap-4  pb-5 border-b-[1px] border-border">
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer`}
                        onClick={() => {
                            logOut();
                            router.push("/");
                        }}
                    >
                        <MdLogout size={24} />
                        <Large>Log out</Large>
                    </div>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};
