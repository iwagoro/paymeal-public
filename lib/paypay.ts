export const createPayment = async (items: string[], total: number) => {
    try {
        const res = await fetch("http://127.0.0.1:8000", { cache: "no-store", method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, total }) });
        const data = await res.json();
        const url = data.url;
        window.location.href = url;
    } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
    }
};
