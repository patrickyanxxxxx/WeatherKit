import { Hono } from "hono/tiny";
import { fetch } from "@nsnanocat/util";
import egernLocalModule from "./egernLocalModule.mjs";
import egernModule from "./egernModule.mjs";
import localRequestScript from "./localRequestScript.mjs";
import loonLocalPlugin from "./loonLocalPlugin.mjs";
import HonoWorkerAdapter from "./class/HonoWorkerAdapter.mjs";
import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";
/***************** Processing *****************/

export default new Hono()
    .get("/", c => c.text("OK"))
    .get("/modules/iRingo.WeatherKit.Rewrite.yaml", c =>
        c.body(egernModule, 200, {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "application/yaml; charset=utf-8",
        }),
    )
    .get("/modules/iRingo.WeatherKit.Local.yaml", c =>
        c.body(egernLocalModule, 200, {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "application/yaml; charset=utf-8",
        }),
    )
    .get("/modules/iRingo.WeatherKit.Local.lpx", c =>
        c.body(loonLocalPlugin, 200, {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "text/plain; charset=utf-8",
        }),
    )
    .get("/modules/iRingo.WeatherKit.Local.js", c =>
        c.body(localRequestScript, 200, {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "application/javascript; charset=utf-8",
        }),
    )
    .all("/:rest{.*}", async c => {
        let $request = await HonoWorkerAdapter.buildRequest(c.req);
        $request = HonoWorkerAdapter.buildArgument($request);
        let $response;
        ({ $request, $response } = await Request($request));
        switch (typeof $response) {
            case "undefined":
                $response = await fetch($request);
                $response = await Response($request, $response);
                break;
            case "object":
                break;
            default:
                throw new TypeError(`Invalid response type: ${typeof $response}`);
        }
        return HonoWorkerAdapter.writeResponse(c, $response);
    })
    .onError((e, c) => {
        console.error(e);
        return c.body(e.message, 500);
    });
