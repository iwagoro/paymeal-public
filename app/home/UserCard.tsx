"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuroraBackground } from "@/components/util/aurora";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge } from "lucide-react";
import { useContext } from "react";

export default function UserCard() {
    const { user } = useContext(AuthContext);
    return (
        <Card className="w-full">
            <AuroraBackground>
                <CardHeader>
                    <div className="w-full flex justify-between items-center">
                        <CardTitle className="text-4xl text-primary">Welcome Back!</CardTitle>
                    </div>
                    <CardDescription className="text-xs">USER : {user?.email}</CardDescription>
                    <CardDescription className="text-xs">ID : {user?.id}</CardDescription>
                </CardHeader>
            </AuroraBackground>
        </Card>
    );
}
