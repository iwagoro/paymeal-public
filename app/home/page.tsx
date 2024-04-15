"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { H1, H2, H3, Mute, P } from "@/components/ui/typography";
import { FlowCard1, FlowCard2 } from "@/components/util/flow-card";
export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div>
                <H1>Welcom Back!</H1>
                <Mute>This application is only a test version. In the meantime, we plan to support Paypay payments. Also, the authentication function has not yet been implemented, so it can only be used by test users. I intend to specify the domain with tokuyama.kosen-ac.jp using the email address authentication function of Firebase Authorization sooner or later.</Mute>
            </div>

            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Information</H2>
                    <Mute>Here are some of the information </Mute>
                </div>
                <FlowCard1>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <span key={index} className="text-4xl font-semibold">
                            {index + 1}
                        </span>
                    ))}
                </FlowCard1>
            </div>
            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Popular Menu</H2>
                    <Mute>Here are some of the most popular menus in terms of weekly sales</Mute>
                </div>

                <FlowCard2>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <span key={index} className="text-4xl font-semibold">
                            {index + 1}
                        </span>
                    ))}
                </FlowCard2>
            </div>
        </div>
    );
}
