import { parseArgs } from "node:util";

export class ParseArgs {
  #options;

  constructor(options) {
    this.#options = options;
  }

  TT = (args) => {
    try {
      const result = parseArgs({ args, options: this.#options });
      console.log(result);
      if (result === null || Object.keys(result.values).length === 0)
        return null;
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  Parse = (args) => {
    try {
      const result = parseArgs({ args, options: this.#options });
      if (
        result === null ||
        result.values.username === "" ||
        Object.keys(result.values).length === 0
      )
        return null;
      return result;
    } catch (error) {
      return null;
    }
  };
}
