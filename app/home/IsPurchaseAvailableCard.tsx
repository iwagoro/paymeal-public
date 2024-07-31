import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, toZonedTime } from "date-fns-tz";

export default function IsPurchaseAvailableCard() {
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "8:00" && today <= "13:00";
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <span className="text-primary text-4xl">{isAvailable ? "A" : "Una"}vailable</span>
                    <br /> to puchase
                </CardTitle>
                <CardDescription>Purchase is available between 8:00 and 13:00</CardDescription>
            </CardHeader>
        </Card>
    );
}
