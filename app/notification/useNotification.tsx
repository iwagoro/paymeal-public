"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { sendToken, getOrder, place_order } from "@/lib/appUtils";

export default function useNotification() {
    const { user } = useContext(AppContext);
    const [order, setOrder] = useState<object[]>([]);
    const [orderId, setOrderId] = useState<string[]>([]);
    const [orderStatus, setOrderStatus] = useState<string[]>([]);
    const [orderDate, setOrderDate] = useState<string[]>([]);

    //! ユーザーに通知の許可を求め、トークンを取得する
    const requestPermissionAndToken = async () => {
        try {
            alert("Please allow notifications to receive order updates.");
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("Notification permission granted.");
                const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
                sendToken(user.token, token);
            } else {
                console.log("Unable to get permission to notify.");
            }
        } catch (error) {
            console.error("An error occurred while getting the token: ", error);
        }
    };

    //! 通知トークンを取得する
    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
            return;
        }

        if (!user || (Object.keys(user).length === 0 && user.constructor === Object)) {
            // userがnull、undefined、または空のオブジェクトの場合、ここで処理をスキップ
            return;
        }

        if (Notification.permission === "granted") {
            console.log("Notification permission already granted.");
            getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
                .then((token) => {
                    console.log("Token: ", token);
                    sendToken(user.token, token);
                })
                .catch((error) => {
                    console.error("An error occurred while getting the token: ", error);
                });
        } else {
            requestPermissionAndToken();
        }
    }, [user]);

    //! ユーザーの注文情報を取得する
    useEffect(() => {
        if (!user) return;
        getOrder(user.token).then((data: any) => {
            if (!data) return;
            setOrder([]);
            setOrderId([]);
            setOrderStatus([]);
            setOrderDate([]);
            data.forEach((order: any) => {
                setOrder((prev: any[]) => [...prev, order.items]);
                setOrderId((prev: any) => [...prev, order.id]);
                setOrderStatus((prev: any) => [...prev, order.status]);
                setOrderDate((prev: any) => [...prev, order.date]);
            });
        });
    }, [user]);

    return { order, orderId, orderStatus, orderDate };
}
