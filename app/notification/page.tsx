"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Separator } from "@/components/ui/separator";
import { Mute } from "@/components/util/typography";
import { SystemMessage, UserMessage } from "@/components/util/message";

export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <SystemMessage />
            <UserMessage />

            <Separator className="flex justify-center items-center">
                <div className="bg-background px-4 ">
                    <Mute>Now</Mute>
                </div>
            </Separator>
        </div>
    );
}
