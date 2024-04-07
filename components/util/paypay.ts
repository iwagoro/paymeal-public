export const createQR = async () => {
    const url = "http://127.0.0.1:8081";
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
        }),
    });
    const data = await response.json();
    console.log(data);
};
