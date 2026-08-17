import { argumentTemplate, argumentsList, endpoint, requestScriptURL } from "./localModuleArguments.mjs";

const values = argumentsList.map(({ key, value }) => `  ${key}: ${value === "" ? "''" : value}`).join("\n");
const descriptions = argumentsList
    .map(({ key, choices }) => `  ${key}: ${choices ? [key === "AirQuality.Calculate.Algorithm" ? "美标 AQI（默认）" : "", ...choices].filter(Boolean).join("、") : "可在本地编辑。"}`)
    .join("\n");
const requestScripts = [
    ["availability", "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/availability\\/"],
    ["airQualityScale", "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/airQualityScale\\/"],
    ["weatherAlerts", "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/weatherAlerts\\?"],
    ["weather", "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v2\\/weather\\/"],
]
    .map(([name, match]) => `- http_request:\n    name: WeatherKit.${name}.request\n    match: ${match}\n    script_url: ${requestScriptURL}\n    env:\n      _compat.$argument: ${argumentTemplate}`)
    .join("\n");

export default `name: ' iRingo: 🌤 WeatherKit (Local Parameters)'
description: |-
  与 v3.3.0 发行模块相同的本地参数界面，数据计算由指定 Worker 完成。
compat_arguments:
  endpoint: ${endpoint}
${values}
compat_arguments_desc: |
  endpoint: Worker 服务端点。
${descriptions}
  API 令牌仅通过 HTTPS 请求头发送给 Worker，不会附加到 URL。
author: VirgilClyne[https://github.com/VirgilClyne],WordlessEcho[https://github.com/WordlessEcho],001[https://github.com/001ProMax],hhh2210[https://github.com/hhh2210]
homepage: https://github.com/patrickyanxxxxx/WeatherKit
icon: https://developer.apple.com/assets/elements/icons/weatherkit/weatherkit-128x128.png
rules:
- domain:
    match: weather-analytics-events.apple.com
    policy: REJECT-DROP
scriptings:
${requestScripts}
mitm:
  hostnames:
    includes:
    - weatherkit.apple.com
`;
