"use client";
import SignUpForm from "./form/SignUpForm";
import LoginForm from "./form/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
export default function AuthPage() {
    //? ログインとサインアップの状態を管理する
    const [state, setState] = useState<"login" | "signup">("login");

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 ">
            <Card className="w-full max-w-lg">
                {/* //? カードのヘッダーにタイトルと説明を表示する */}
                <CardHeader className="w-full flex justify-center gap-5">
                    <CardTitle className="text-center">{state === "signup" ? "新規登録" : "サインイン"}</CardTitle>
                    <CardDescription className="text-center">Paymealへようこそ!{state === "signup" ? "新規登録" : "サインイン"}をお願いします。</CardDescription>
                </CardHeader>
                {/* //? サインアップとログインのフォームを表示する */}
                <CardContent>{state === "signup" ? <SignUpForm /> : <LoginForm />}</CardContent>
                {/* //?SingupとLoginの切り替えボタン */}
                <CardFooter className="w-full">
                    <CardDescription className="flex w-full  justify-center">
                        {state === "signup" ? "既にアカウントを持っている" : "まだアカウントを持っていない"}
                        場合は
                        <button
                            className="text-primary underline"
                            onClick={() => {
                                setState(state === "signup" ? "login" : "signup");
                            }}
                        >
                            {state === "signup" ? "サインイン" : "新規登録"}
                        </button>
                        をお願いします。
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
