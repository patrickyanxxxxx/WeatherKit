import { argumentsList, requestScriptURL } from "./localModuleArguments.mjs";

const argumentLines = argumentsList
    .map(({ key, value, type, choices = [] }) => `${key} = ${type},"${value}"${choices.length ? `,${choices.map(choice => `"${choice}"`).join(",")}` : ""}`)
    .join("\n");
const requestRules = [
    "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/availability\\/",
    "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/airQualityScale\\/",
    "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v1\\/weatherAlerts\\?",
    "^https?:\\/\\/weatherkit\\.apple\\.com\\/api\\/v2\\/weather\\/",
]
    .map(pattern => `http-request ${pattern} script-path=${requestScriptURL}, tag=WeatherKit.local.request, argument=[{endpoint},{DataSets},{Weather.Provider},{WeatherAlerts.Provider},{NextHour.Provider},{AirQuality.Current.Pollutants.Provider},{AirQuality.Calculate.Algorithm},{API.ColorfulClouds.Token},{API.QWeather.Host},{API.QWeather.Token},{API.WAQI.Token},{Storage},{LogLevel}]`)
    .join("\n");

export default `#!name =  iRingo: 🌤 WeatherKit (Local Parameters)
#!desc = 与 v3.3.0 发行模块相同的本地参数界面，数据计算由指定 Worker 完成。
#!homepage = https://github.com/patrickyanxxxxx/WeatherKit
#!icon = https://developer.apple.com/assets/elements/icons/weatherkit/weatherkit-128x128.png

[Argument]
endpoint = input,"weatherkit.1976950515yty.workers.dev"
${argumentLines}

[Rule]
DOMAIN,weather-analytics-events.apple.com,REJECT-DROP

[Script]
${requestRules}

[MITM]
hostname = weatherkit.apple.com
`;
