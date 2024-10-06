import { Appsignal } from "@appsignal/nodejs";
import * as skiffaAppsignal from "@skiffa/appsignal";
import * as api from "noop-api";

skiffaAppsignal.instrument(api.lib.defaultServerWrappers);

export const appsignal = new Appsignal({
  active: true,
  environment: process.env.NODE_ENV,
  name: "skiffa-examples/appsignal",
});
