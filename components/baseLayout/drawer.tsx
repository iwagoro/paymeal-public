import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Large } from "@/components/ui/typography";
import { Menu, Sun, Moon } from "lucide-react";
import { MdLogout } from "react-icons/md";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export default async function Drawer() {
    const session = await auth();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-start items-start gap-5">
                <SheetHeader className="flex justify-start">
                    <SheetTitle className="text-left">User detail</SheetTitle>
                    <SheetDescription>{session?.user && session.user.email}</SheetDescription>
                </SheetHeader>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="w-full flex gap-5 items-center   border-border  curosr-pointer">
                        <MdLogout size={24} />
                        <Large>Log out</Large>
                    </button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
