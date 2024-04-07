export async function GET(req: Request) {
    const url = "http://127.0.0.1:8081/create_payment";

    // const url = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid`;
    const response = await fetch(url);
    const paymentUrl = await response.json();
    return Response.json({ paymentUrl });
}
