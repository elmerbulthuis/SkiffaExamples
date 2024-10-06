import { appsignal } from "./appsignal.js";

try {
  await import("./program.js");
} finally {
  await appsignal.stop();
}
