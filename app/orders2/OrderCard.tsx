import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderCard({ order }: { order: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{order.number}</CardTitle>
            </CardHeader>
        </Card>
    );
}
