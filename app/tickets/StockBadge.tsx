import { Badge } from "@/components/ui/badge";
import { TicketStockType } from "@/lib/types";
import { getHandler } from "@/lib/apiHandler";

const getStocks = async () => {
    const data = await getHandler({ method: "GET", endpoint: "/stocks", revalidate: 10, returnType: "array" });
    return data;
};

export default async function StockBadges({ id }: { id: number }) {
    const stocks = (await getStocks()) as TicketStockType[];
    const stock = stocks.find((stock) => stock.ticket_id === id);
    return <Badge variant="outline">{(stock?.stock ?? 0) - (stock?.unit_sales ?? 0)} in stock</Badge>;
}
