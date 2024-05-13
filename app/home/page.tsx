"use client";
import { H1, H2, H3, Mute, P } from "@/components/ui/typography";
import { FlowCard1, FlowCard2 } from "@/components/util/flow-card";
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
export default function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Card>
                <CardHeader>
                    <CardTitle>Welcom Back!</CardTitle>
                    <CardDescription>
                        This application is only a test version. In the meantime, we plan to support Paypay payments. Also, the authentication function has not yet been implemented, so it can only be
                        used by test users. I intend to specify the domain with tokuyama.kosen-ac.jp using the email address authentication function of Firebase Authorization sooner or later.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Information</CardTitle>
                    <CardDescription>Here are some of the information </CardDescription>
                </CardHeader>
                <CardContent>
                    <FlowCard1>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <span key={index} className="text-4xl font-semibold">
                                {index + 1}
                            </span>
                        ))}
                    </FlowCard1>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Popular Menu</CardTitle>
                    <CardDescription>Here are some of the most popular menus in terms of weekly sales</CardDescription>
                </CardHeader>

                <CardContent>
                    <FlowCard2>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <span key={index} className="text-4xl font-semibold">
                                {index + 1}
                            </span>
                        ))}
                    </FlowCard2>
                </CardContent>
            </Card>
        </div>
    );
}
