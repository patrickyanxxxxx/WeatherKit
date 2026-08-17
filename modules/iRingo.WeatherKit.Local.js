const settings = new URLSearchParams(String($argument ?? ""));
const endpoint = settings.get("endpoint")?.replace(/^"|"$/g, "");

if (!endpoint) {
    $done({});
} else {
    const url = new URL($request.url);
    url.protocol = "https:";
    url.host = endpoint;
    url.pathname = `/weatherkit.apple.com${url.pathname}`;
    const headers = { ...$request.headers, "X-iRingo-WeatherKit-Arguments": String($argument ?? "") };
    $done({ url: url.toString(), headers });
}
