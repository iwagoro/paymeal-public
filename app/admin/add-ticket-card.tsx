"use client";

import { AppContext } from "@/components/util/provider/app-provider";
import { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { addAdmin, addTicket, getUserEmail } from "@/lib/appUtils";
export default function AddTicketCard() {
    const { user } = useContext(AppContext);

    const submit = async () => {
        const ticketname = document.getElementById("ticketname") as HTMLInputElement;
        const ticketdescription = document.getElementById("ticketdescription") as HTMLInputElement;
        const ticketprice = document.getElementById("ticketprice") as HTMLInputElement;
        const ticketimg = document.getElementById("ticketimg") as HTMLInputElement;

        if (!ticketname || !ticketdescription || !ticketprice || !ticketimg) return;

        const ticketobj = {
            name: ticketname.value,
            description: ticketdescription.value,
            price: 2000,
            stock: 100,
            img_url: ticketimg.value,
        };

        const res: any = await addTicket(user.token, ticketobj);
        if (res) {
            alert("Ticket Added");
        } else {
            alert("Failed to add ticket");
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add Ticket</CardTitle>
                <CardDescription>Click the button below to add a ticket to your cart.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Enter Ticket Name</Label>
                <Input id="ticketname" placeholder="Ticket Name" />
                <Label>Enter Ticket Description</Label>
                <Input id="ticketdescription" placeholder="Ticket Description" />
                <Label>Enter Ticket Price</Label>
                <Input id="ticketprice" placeholder="Ticket Price" />
                <Label>Enter Ticket Image Url</Label>
                <Input id="ticketimg" placeholder="Ticket Image Url" />
                <Button onClick={submit}>Add Ticket</Button>
            </CardContent>
            <Button onClick={() => getUserEmail(user.token).then((data) => console.log(data))}></Button>
            <Button onClick={() => addAdmin(user.token, "Admin123")}>Log Token</Button>
        </Card>
    );
}
