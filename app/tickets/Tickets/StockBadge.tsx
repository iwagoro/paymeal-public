"use client";
import { Badge } from "@/components/ui/badge";
import { TicketStockType } from "@/lib/types";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function StockBadges({ id }: { id: number }) {
    const { user } = useContext(AuthContext);
    const { data: stocks, error, isLoading } = useSWR<TicketStockType[]>(user.token ? ["/stocks", user.token] : null, ([url, token]) => fetcher(url, token as string));

    const stock = stocks?.find((stock) => stock.ticket_id === id);
    return <Badge variant="outline">{(stock?.stock ?? 0) - (stock?.unit_sales ?? 0)} in stock</Badge>;
}
