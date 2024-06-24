import * as React from "react";
import { Lock, LockOpen } from "lucide-react";
import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export async function AuthToggle() {
    const session = await auth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {session ? <Lock className="h-[1.2rem] w-[1.2rem]  transition-all" /> : <LockOpen className="absolute h-[1.2rem] w-[1.2rem]  transition-all " />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {session ? (
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <button className="p-2">LogOut</button>
                    </form>
                ) : (
                    <form
                        action={async () => {
                            "use server";
                            await signIn();
                        }}
                    >
                        <button className="p-2">LogIn</button>
                    </form>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
