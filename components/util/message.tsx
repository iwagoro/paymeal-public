import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { P, Large, Mute } from "@/components/util/typography";
import { FaExclamation } from "react-icons/fa6";

export const SystemMessage = () => {
    return (
        <div className="w-full flex justify-start  gap-4 ">
            <Accordion className="rounded-2xl  rounded-bl-[0] max-w-sm border border-border " collapsible type="single">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-3">
                        <Large>Available for order now</Large>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 pt-0">
                        <Mute>You currently have an unordered items. You can place your order from now until 13:00</Mute>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export const UserMessage = () => {
    return (
        <div className="w-full flex justify-end  gap-4">
            <Accordion className="rounded-2xl  rounded-br-[0] max-w-sm border border-border " collapsible type="single">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-3">
                        <Large>You ordered #dfj3239</Large>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 pt-0">
                        <Mute>You placed your order on 2024/11/23/11 at 11:30 Estimated completion time is around 2024/11/23/11:40 We will notify you on this page as soon as it is completed, so please sit down and wait.</Mute>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
