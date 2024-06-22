import LatestOrderCard from "./LatestOrderCard";
// import useOrder from "./useOrder";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

export default async function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <LatestOrderCard />
            <OrdersCard />
        </div>
    );
}
