import { TicketType } from "@/lib/types";
import BanerCard from "./BannerCard";
import { getHandler } from "@/lib/apiHandler";
import { H1, H2, H3 } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

const getPopularTickets = async () => {
    const data = await getHandler({ method: "GET", endpoint: "/tickets/popular", revalidate: 100, returnType: "array" });
    return data;
};

export default async function PopularTickets() {
    const tickets = (await getPopularTickets()) as TicketType[];
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
                            <H2 className="text-xl font-bold text-gray-500">{index + 1}番人気</H2>
                            <H1 className="text-4xl font-bold">{ticket.name}</H1>
                            <p className="text-xl ">{ticket.description}</p>
                            <Badge className="w-fit text-lg">¥{ticket.price}</Badge>
                        </div>
                    </div>
                ))}
            </BanerCard>
        </div>
    );
}
