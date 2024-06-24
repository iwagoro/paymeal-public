import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getHandler } from "@/lib/apiHandler";
import { auth } from "@/lib/auth";
const getUsage = async (token: string) => {
    const data = await getHandler({ method: "GET", endpoint: "/user/usage", token: token, revalidate: 10, returnType: "object" });
    return data;
};

export default async function UsageCard() {
    const session = await auth();
    const usage = (session && ((await getUsage(session.idToken)) as { current_month_total: number; last_month_total: number })) ?? { current_month_total: 0, last_month_total: 0 };
    return (
        <Card className="flex-[2] h-fit">
            <CardHeader>
                <CardDescription>This Week</CardDescription>

                <CardTitle className="text-primary text-4xl">¥{usage!.current_month_total}</CardTitle>
                <CardDescription>
                    {usage!.current_month_total < usage!.last_month_total ? "-" : "+"}¥{Math.abs(usage!.current_month_total - usage!.last_month_total)} from last month{" "}
                </CardDescription>

                <Progress className="h-2" value={usage!.last_month_total !== 0 ? (usage!.current_month_total / usage!.last_month_total) * 100 : usage!.current_month_total} />
            </CardHeader>
        </Card>
    );
}
