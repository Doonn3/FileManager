import { access, stat } from "fs/promises";

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

export async function checkAccess(file) {
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

export async function checkStat(path) {
  const result = await stat(path);
  return result;
}

export function requiredParams(options, args) {
  if (options.countParams === undefined || options.countParams < 1) return null;
  let require = {};

  args.forEach((param) => {
    if (param.trim() !== "") {
      require[param] = param;
    }
  });

  const keys = Object.keys(require);

  if (keys.length === 0 || keys.length > options.countParams) {
    return null;
  }

  return require;
}
