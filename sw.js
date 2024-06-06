self.addEventListener("install", (event) => {
    console.log("installed!");
});
self.addEventListener("activate", () => {
    console.log("activated!");
});
self.addEventListener("fetch", async (event) => {
    console.log("intercept fetch");
    const { request } = event;
    if (request.url.includes("login")) {
        event.respondWith(handleLoginRequest(request));
    }
});
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event#description
// ...The respondWith() method must be called synchronously: that is, you can't call it in a then handler.
async function handleLoginRequest(request) {
    const body = await request.json();
    const email = body.email;
    const password = body.password;
    if (email === "hoge@example.com" && password === "1234") {
        return new Response(JSON.stringify({ token: "1234567" }), { status: 200 });
    }
    return new Response(JSON.stringify({ message: "unauthorized" }), {
        status: 401,
    });
}
export {};
