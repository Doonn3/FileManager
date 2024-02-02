import { access } from "fs/promises";

export function parseCommand(value) {
  if (value === undefined) return;

  const data = value.split(" ");

  return { command: data[0], params: data[1] };
}

export function newParseCommand(value) {
  if (value === undefined) return null;

  if (Array.isArray(value)) {
    console.log("да это массив");
    value = value.join(" ");
  }

  const data = value.split(" ");

  const props = {
    command: data.reverse().pop(),
    params: [...data.reverse()],
  };

  return props;
}

export async function checkFile(file) {
  try {
    await access(file);
    return true;
  } catch (err) {
    return false;
  }
}

export function log() {
  const reset = "\x1b[0m";
  const red = "\x1b[31m";
  const yellow = "\x1b[33m";
  return {
    red: (text) => console.log(`${red} ${text} ${reset}`),
    yellow: (text) => console.log(`${yellow} ${text} ${reset}`),
  };
}

export function printInvalidInput() {
  log().red("Invalid input");
}

export function printOperationFailed() {
  log().red("Operation failed");
}
