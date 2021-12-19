import { Command } from "commander";

import { parse } from "./base";

const program = new Command("123");

program
  .requiredOption("--input [path]")
  .requiredOption("--output [path]")
  .parse(process.argv);

const options = program.opts();

if (!("input" in options))
  throw new Error("Invalid command missing required options --input");
if (!("output" in options))
  throw new Error("Invalid command missing required options --output");
parse(options["input"], options["output"]).then(() => console.log("DONE"));
