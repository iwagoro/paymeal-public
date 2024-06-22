"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { FormType } from "../handlers";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();

    return (
        // <form onSubmit={handleSubmit((data) => LoginHandler(data, setErrorMessage))} className="w-full flex flex-col gap-10">
        <form onSubmit={handleSubmit((data) => signIn("credentials", { email: data.email, password: data.password, redirect: true, callbackUrl: "/" }))} className="w-full flex flex-col gap-10">
            {errorMessage && (
                <Alert variant="destructive">
                    <TriangleAlert size={16} />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <FormInput id="email" label="Email" type="email" register={register} errors={errors} validation={{ required: "Email is required" }} />
            <FormInput id="password" label="Password" type="password" register={register} errors={errors} validation={{ required: "Password is required" }} />
            <Button className="w-full" type="submit">
                Login
            </Button>
        </form>
    );
}
