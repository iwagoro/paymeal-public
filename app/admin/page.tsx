"use client";
import { useEffect, useState } from "react";
import AddTicketCard from "./add-ticket-card";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <AddTicketCard />
        </div>
    );
}
