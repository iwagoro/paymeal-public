"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { H2, P } from "@/components/util/typography";
export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Your Shopping Bag</H2>
                    <P>descriptiondescriptiondescriptiondescription</P>
                </div>
            </div>
        </div>
    );
}
