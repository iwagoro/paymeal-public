import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/app-provider";
import { TagType, TicketStockType, TicketType } from "@/lib/types";
import { apiRequest } from "@/lib/apiHandler";
import { toast } from "sonner";

export default function useTickets() {
    const { user } = useContext(AppContext);
    const [tags, setTags] = useState<TagType[]>([]);
    const [selectedTag, setSelectedTag] = useState<TagType>({} as TagType);
    const [stocks, setStocks] = useState<TicketStockType[]>([]);
    const [tickets, setTickets] = useState<TicketType[]>([]);

    const getTickets = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/tickets",
            useCache: true,
        }).then((data) => {
            setTickets(data);
        });
    };

    const getTags = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/tags",
            useCache: true,
        }).then((data) => {
            setTags(data);
            setSelectedTag(data[0]);
        });
    };

    const getStocks = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/stocks",
        }).then((data) => {
            setStocks(data);
        });
    };

    const addToCart = async (ticket_id: number) => {
        apiRequest({
            method: "POST",
            endpoint: "/api/cart/",
            token: user.token,
            params: { ticket_id: ticket_id },
        })
            .then((data) => {
                toast.success("Added to cart");
            })
            .catch((error) => {
                toast.error("Failed to add to cart");
            });
    };

    //! 初回レンダリング時に全チケット、全在庫、全タグを取得
    useEffect(() => {
        getTickets().then(() => getStocks());
        getTags();
    }, []);

    useEffect(() => {
        if (stocks.length > 0) {
            const updatedTickets = tickets.map((ticket, i) => {
                return { ...ticket, stock: stocks[i].stock, sales: stocks[i].unit_sales };
            });
            setTickets(updatedTickets);
        }
    }, [stocks]);

    return { user, tags, stocks, tickets, selectedTag, setSelectedTag, addToCart };
}
