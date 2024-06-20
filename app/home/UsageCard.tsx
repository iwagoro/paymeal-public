import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useHome from "./useHome";

export default function UsageCard() {
    const { usage } = useHome();
    return (
        <Card className="flex-[2] h-fit">
            <CardHeader>
                <CardDescription>This Week</CardDescription>

                <CardTitle className="text-primary text-4xl">¥{usage.current_month_total}</CardTitle>
                <CardDescription>
                    {usage.current_month_total < usage.last_month_total ? "-" : "+"}¥{Math.abs(usage.current_month_total - usage.last_month_total)} from last month{" "}
                </CardDescription>

                <Progress className="h-2" value={usage.last_month_total !== 0 ? (usage.current_month_total / usage.last_month_total) * 100 : usage.current_month_total} />
            </CardHeader>
        </Card>
    );
}
