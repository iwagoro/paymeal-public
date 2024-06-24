"use client";

import { useEffect, useState } from "react";
import { BellRing, BellOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { getHandler, postHandler, deleteHandler } from "@/lib/apiHandler";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserType } from "@/lib/types";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

const getUser = async (token: string) => {
    const user = await getHandler({ method: "GET", endpoint: "/user", token: token, returnType: "object" });
    return user;
};
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        return registration;
    }
    throw new Error("Service worker not supported");
};

export function NotificationToggle() {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserType>({} as UserType);

    useEffect(() => {
        if (session) {
            getUser(session.idToken).then((data) => setUser(data as UserType));
        }
    }, [session]);

    const getNotificationToken = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            try {
                const registration = await registerServiceWorker();
                const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, serviceWorkerRegistration: registration });
                if (currentToken) {
                    console.log(currentToken);
                    return currentToken;
                } else {
                    throw new Error("No registration token available. Request permission to generate one.");
                }
            } catch (error) {
                throw new Error("An error occurred while retrieving token: " + String(error));
            }
        }
    };

    const setNotificationToken = async () => {
        getNotificationToken().then((token) => {
            session && token && postHandler({ endpoint: "/user/notification", token: session.idToken, params: { token: token } }).then(() => setUser({ ...user, notification_token: token }));
        });
    };

    const deleteNotifications = async () => {
        session && deleteHandler({ endpoint: "/user/notification", token: session.idToken }).then(() => setUser({ ...user, notification_token: null }));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {user.notification_token ? <BellRing className="h-[1.2rem] w-[1.2rem] transition-all" /> : <BellOff className="absolute h-[1.2rem] w-[1.2rem] transition-all" />}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setNotificationToken()}>Enable Notification</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteNotifications()}>Disable Notification</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
