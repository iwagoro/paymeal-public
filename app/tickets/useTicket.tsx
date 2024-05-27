import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/app-provider";
import { addTicket, getAllTickets, getTags, getRelations } from "@/lib/api/ticket";
import { TicketFormValues, TicketType, RelationType, TagType } from "@/lib/types";

export default function useTicket() {
    const { user } = useContext(AppContext);
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [tags, setTags] = useState<TagType[]>([]);
    const [relations, setRelations] = useState<RelationType[]>([]);
    const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("all");

    //! チケット、タグ、チケットとタグの関連を取得
    useEffect(() => {
        Promise.all([getAllTickets(), getTags(), getRelations()]).then(([tickets, tags, relations]: [TicketType[], TagType[], RelationType[]]) => {
            setTickets(tickets);
            setTags([{ id: 0, name: "all" } as TagType, ...tags]);
            setRelations(relations);
        });
    }, []);

    //! 選択されたタグに関連するチケットを取得
    useEffect(() => {
        if (selectedTag === "all") {
            setSelectedTickets(tickets);
        } else {
            const selected_tag_id = tags.find((tag) => tag.name === selectedTag)?.id;
            setSelectedTickets(tickets.filter((ticket) => relations.find((tag) => tag.ticket_id === ticket.id && tag.tag_id === selected_tag_id)));
        }
    }, [selectedTag, tickets]);

    const addToCart = async (ticket_id: number) => {
        user.token && ticket_id && addTicket(user.token, ticket_id);
    };

    return { tickets, tags, relations, selectedTickets, selectedTag, setSelectedTickets, setSelectedTag, addToCart };
}
