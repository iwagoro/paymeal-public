"use client";
import { Mute, H3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createUser, loginUser } from "@/lib/auth";

export default function Login() {
    const signinHandler = async () => {
        const email = document.getElementById("signin-email") as HTMLInputElement;
        const password = document.getElementById("signin-password") as HTMLInputElement;

        if (email.value !== "" && password.value !== "") {
            loginUser(email.value, password.value);
        } else {
            toast("Opps!", { description: "Please fill in all fields" });
        }
    };

    const signupHandler = async () => {
        const email = document.getElementById("signup-email") as HTMLInputElement;
        const password = document.getElementById("signup-password") as HTMLInputElement;
        if (email.value !== "" && password.value !== "") {
            createUser(email.value, password.value);
        } else {
            toast("Opps!", { description: "Please fill in all fields" });
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
