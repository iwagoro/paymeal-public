"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { useState, useEffect } from "react";
import { increaseItem, getTickets } from "@/lib/appUtils";
import { ticketProps } from "@/lib/types";

export function useMenu() {
    const { user } = useContext(AppContext);
    const [tickets, setTickets] = useState<ticketProps[]>([]);

    //! ユーザーがログインしている場合、チケットを取得する
    useEffect(() => {
        if (!user) return;
        getTickets().then(setTickets);
    }, [user]);

    //! カートにアイテムを追加する
    const addToBag = async (ticket_id: number) => {
        if (!user) return;
        const status = await increaseItem(user.token, ticket_id);
        if (status) {
            alert("カートに追加しました");
        } else {
            alert("エラーが発生しました");
        }
    };

    return { tickets, addToBag };
}
