"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format, toZonedTime } from "date-fns-tz";

export default function IsOrderAvailableCard() {
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    return (
        <Card className="flex-[3]">
            <CardHeader>
                <CardTitle>
                    <span className="text-primary text-4xl">{isAvailable ? "A" : "Una"}vailable</span>
                    <br /> to order
                </CardTitle>
                <CardDescription>Order is available between 11:00 and 13:00</CardDescription>
            </CardHeader>
        </Card>
    );
}
