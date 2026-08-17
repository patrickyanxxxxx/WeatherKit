import { writeFile } from "node:fs/promises";
import egernLocalModule from "../src/egernLocalModule.mjs";
import loonLocalPlugin from "../src/loonLocalPlugin.mjs";
import localRequestScript from "../src/localRequestScript.mjs";

await writeFile(new URL("../modules/iRingo.WeatherKit.Local.yaml", import.meta.url), egernLocalModule, "utf8");
await writeFile(new URL("../modules/iRingo.WeatherKit.Local.lpx", import.meta.url), loonLocalPlugin, "utf8");
await writeFile(new URL("../modules/iRingo.WeatherKit.Local.js", import.meta.url), localRequestScript, "utf8");
