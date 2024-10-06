import * as api from "noop-api";
import * as shared from "shared";
import * as yargs from "yargs";
import * as operationHandlers from "../operation-handlers.js";

export function configureServerCommand(argv: yargs.Argv) {
  return argv.command(
    "server",
    "Start server",
    (yargs) =>
      yargs
        .option("pg-connection-string", {
          description: "Connection string database",
          type: "string",
          default: "postgres://postgres@localhost:5432/postgres",
        })
        .option("listen-port", {
          description: "Port to listen to",
          type: "number",
          default: 8080,
        }),
    (argv) => main(argv),
  );
}

interface MainConfiguration {
  pgConnectionString: string;
  listenPort: number;
}

// entrypoint for the server
async function main(configuration: MainConfiguration) {
  const { pgConnectionString, listenPort } = configuration;

  console.info(`Starting server...`);

  await shared.withPgPool({ pgConnectionString }, async () => {
    // create the server
    const server = new api.server.Server();

    server.registerMiddleware(api.lib.createErrorMiddleware());

    // register all operations
    server.registerOperations(operationHandlers);

    {
      // listen to the specified port and send requests to the server. We are
      // using the `using` syntax here, the server will be disposed (terminated)
      // at the end of the current block.
      await using listener = await api.lib.listen(server, { port: listenPort });

      console.info(`Server started (${listener.port})`);

      // wait for a user to send a signal and eventually stop listening.
      await shared.waitForSignal("SIGINT", "SIGTERM");

      console.info("Stopping server...");

      // Thanks to the `using` keyword (and a proper implementation of the dispose)
      // the server is terminated here, at the end of this block.
    }
  });

  console.info(`Server stopped`);
}
