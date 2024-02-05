import { IExecuteValue } from "./BaseCommand.mjs";
import { createReadStream } from "fs";
import {
  checkAccess,
  printInvalidInput,
  printOperationFailed,
  requiredParams,
} from "../utils/utils.mjs";

export class CommandRead extends IExecuteValue {
  async Execute(args) {
    if (args.length > 1 || args.length === 0) {
      printInvalidInput();
      return;
    }
    await this.#read(args[0]);
  }

  async #read(file) {
    const filePath = `${this.Manager.Path.CurrPath}/${file}`;

    try {
      const result = await checkAccess(filePath);
      if (result === false) printOperationFailed();
      const readStream = createReadStream(filePath, "utf-8");

      readStream.on("data", (chunk) => {
        console.log(chunk);
      });

      readStream.on("close", () => {
        readStream.destroy();
      });

      readStream.on("error", () => {
        printOperationFailed();

        readStream.destroy();
      });
    } catch (error) {
      printInvalidInput();
    }
  }
}
