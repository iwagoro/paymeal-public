import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, toZonedTime } from "date-fns-tz";

export default function IsOrderAvailableCard() {
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <span className="text-primary text-4xl">注文{isAvailable ? "可能" : "不可"}</span>です
                </CardTitle>
                <CardDescription>11:00から13:00までの間に注文が可能です</CardDescription>
            </CardHeader>
        </Card>
    );
}
