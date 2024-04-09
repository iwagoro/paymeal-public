"use client";
import { H1, Mute, H3 } from "@/components/util/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { createUser, signIn } from "@/components/util/auth";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const signinHandler = async () => {
        const email = document.getElementById("signin-email") as HTMLInputElement;
        const password = document.getElementById("signin-password") as HTMLInputElement;

        if (!email.value || !password.value) {
            toast("Opps!", { description: "Please fill in all fields" });
            return;
        }

        const user = await signIn(email.value, password.value);
        if (user !== null && user !== undefined) {
            toast("Opps!", { description: "An error occured" });
        } else {
            toast("Success", { description: "You have successfully signed in" });
            router.push("/home");
        }
    };

    const signupHandler = async () => {
        const email = document.getElementById("signup-email") as HTMLInputElement;
        const password = document.getElementById("signup-password") as HTMLInputElement;
        if (!email.value || !password.value) {
            toast("Opps!", { description: "Please fill in all fields" });
            return;
        }

        const user = await createUser(email.value, password.value);
        if (user !== null && user !== undefined) {
            toast("Opps!", { description: "An error occured" });
        } else {
            router.push("/home");
            toast("Success", { description: "You have successfully created an account" });
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center ">
            <div className=" max-w-md w-full h-full flex flex-col justify-center items-center gap-10 ">
                <div className="w-full flex  flex-col justify-center items-center">
                    <H3>Create an account</H3>
                    <Mute>Enter your email below to create your account</Mute>
                </div>
                <div className="w-full flex  flex-col justify-center items-center gap-5">
                    <Input id="signup-email" type="text" placeholder="i00@tokuyama.kosen-ac.jp"></Input>
                    <Input id="signup-password" type="password" placeholder="password"></Input>
                    <Button className="w-full" onClick={signupHandler}>
                        Create Account
                    </Button>
                </div>
                <Separator className="flex justify-center items-center">
                    <div className="bg-background px-4 ">
                        <Mute>Alrealy Have An Acount?</Mute>
                    </div>
                </Separator>
                <div className="w-full flex  flex-col justify-center items-center gap-5 ">
                    <Input id="signin-email" type="text" placeholder="i00@tokuyama.kosen-ac.jp"></Input>
                    <Input id="signin-password" type="password" placeholder="password"></Input>
                    <Button className="w-full" variant="outline" onClick={signinHandler}>
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}
