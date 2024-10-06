import * as opentelemetry from "./opentelemetry.js";

opentelemetry.sdk.start();
try {
  await import("./program.js");
} finally {
  await opentelemetry.sdk.shutdown();
}
