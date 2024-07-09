import ItemTable from "@/app/cart/Cart/ItemTable";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import fetcher from "@/lib/fetcher";
import { toZonedTime, format } from "date-fns-tz";
import { OrderType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import useSWR from "swr";
import modifier from "@/lib/modifier";

export default function OrderDrawer({ orderId, isOpen, onOpenChange }: { orderId: string; isOpen: boolean; onOpenChange: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { user } = useContext(AuthContext);
    const {
        data: order,
        error,
        isLoading,
    } = useSWR<OrderType>(user?.token && orderId && isOpen ? ["/orders/", user.token] : null, ([url, token]) => fetcher(url, token as string, { order_id: orderId }));
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    const isExpired = order?.purchase_date && order.purchase_date.toLocaleString() != today;

    const placeOrder = async () => {
        user?.token && order?.id && modifier.post("/orders/", user.token, { order_id: order.id });
    };

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>ID : {orderId}</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>{order && <ItemTable cart={order} />}</DrawerFooter>
                <DrawerFooter>
                    <Button disabled={!isAvailable || !isExpired} onClick={placeOrder}>
                        order now
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
