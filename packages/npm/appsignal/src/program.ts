#!/usr/bin/env node

import * as shared from "shared";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import * as commands from "./commands.js";
import { projectRoot } from "./root.js";

await main();

async function main() {
  const packageInfo = shared.readPackageInfo(projectRoot);
  const program = yargs(hideBin(process.argv));

  for (const configureCommand of Object.values(commands)) {
    configureCommand(program);
  }

  program.demandCommand();
  program.env(true);
  program.version(packageInfo.version ?? "0.0.0");

  await program.parseAsync();
}
