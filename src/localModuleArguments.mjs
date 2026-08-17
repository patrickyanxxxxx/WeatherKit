export const endpoint = "weatherkit.1976950515yty.workers.dev";
export const requestScriptURL = "https://weatherkit.1976950515yty.workers.dev/modules/iRingo.WeatherKit.Local.js";

export const argumentsList = [
    { key: "DataSets", value: "airQuality,currentWeather,forecastDaily,forecastHourly,forecastNextHour,weatherAlerts", type: "input" },
    { key: "Weather.Provider", value: "ColorfulClouds", type: "select", choices: ["WeatherKit", "QWeather"] },
    { key: "WeatherAlerts.Provider", value: "QWeatherWeb", type: "select", choices: ["WeatherKit", "QWeather", "ColorfulClouds"] },
    { key: "NextHour.Provider", value: "ColorfulClouds", type: "select", choices: ["WeatherKit", "QWeather"] },
    { key: "AirQuality.Current.Pollutants.Provider", value: "ColorfulClouds", type: "select", choices: ["QWeather"] },
    { key: "AirQuality.Calculate.Algorithm", value: "WAQI_InstantCast_US", type: "select", choices: ["None", "UBA", "EU_EAQI", "WAQI_InstantCast_CN", "WAQI_InstantCast_CN_25_DRAFT", "CA_AQHI", "HK_AQHI", "AQHI_Multi_CN", "AQHI_Multi_CN_HK", "CN_DEATH_AQHI", "CN_DEATH_HK_AQHI"] },
    { key: "API.ColorfulClouds.Token", value: "", type: "input" },
    { key: "API.QWeather.Host", value: "devapi.qweather.com", type: "input" },
    { key: "API.QWeather.Token", value: "", type: "input" },
    { key: "API.WAQI.Token", value: "", type: "input" },
    { key: "Storage", value: "Argument", type: "select", choices: ["PersistentStore", "database"] },
    { key: "LogLevel", value: "WARN", type: "select", choices: ["OFF", "ERROR", "INFO", "DEBUG", "ALL"] },
];

export const argumentTemplate = ["endpoint", ...argumentsList.map(({ key }) => key)].map(key => `${key}="{{{${key}}}}"`).join("&");
