import { TicketType } from "@/lib/types";
import BanerCard from "./BannerCard";
import { getHandler } from "@/lib/apiHandler";
import { H1, H2, H3, List, P } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

const getDailyTickets = async () => {
    const data = await getHandler({ method: "GET", endpoint: "/tickets/daily", revalidate: 100, returnType: "array" });
    return data;
};

export default async function DailyTickets() {
    const tickets = (await getDailyTickets()) as TicketType[];
    return (
        <div>
            <H3 className="pl-[21px]">Daily Menus</H3>
            <BanerCard>
                {tickets.map((ticket, index) => (
                    <div key={index} className="flex items-center h-full gap-5">
                        <div className="flex-[2]">
                            <img src={ticket.img_url} alt={ticket.name} className="w-full" />
                        </div>
                        <div className="flex-[3] flex flex-col  gap-5">
                            <H1 className="text-4xl font-bold">{ticket.name}</H1>
                            <List className="">
                                {Array.isArray(ticket.contents) &&
                                    ticket.contents.map((content, index) => {
                                        return <li key={index}>{content}</li>;
                                    })}
                            </List>
                        </div>
                    </div>
                ))}
            </BanerCard>
        </div>
    );
}
