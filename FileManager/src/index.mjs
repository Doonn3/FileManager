import { CLIApp } from "./CLIApp.mjs";

const app = new CLIApp();
app.ParseArgs(process.argv.slice(2));
