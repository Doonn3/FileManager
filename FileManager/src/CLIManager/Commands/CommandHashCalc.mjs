import { IExecuteValue } from "./BaseCommand.mjs";
import {
  checkAccess,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";
import { createHash } from "crypto";
import { createReadStream } from "fs";

export class CommandHashCalc extends IExecuteValue {
  async Execute(args) {
    if (args.length > 1 || args.length === 0) {
      printInvalidInput();
      return;
    }
    await this.#calculateHash(args);
  }

  async #calculateHash(file) {
    const pathToFile = `${this.Manager.Path.CurrPath}/${file}`;
    const hash = createHash("sha256");
    try {
      const access = await checkAccess(pathToFile);
      if (access === false) throw new Error();

      const input = createReadStream(pathToFile, "utf-8");

      input.on("readable", () => {
        const data = input.read();
        if (data) {
          const result = hash.update(data);
          console.log(`${result.digest("hex")}`);
        }
      });

      input.on("error", () => {
        printOperationFailed();
      });
    } catch (error) {
      printOperationFailed();
    }
  }
}
