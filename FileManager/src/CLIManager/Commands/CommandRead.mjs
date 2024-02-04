import { IExecuteValue } from "./BaseCommand.mjs";
import { createReadStream } from "fs";
import { checkFile, printOperationFailed } from "../utils/utils.mjs";

export class CommandRead extends IExecuteValue {
  async Execute(value) {
    await this.#read(value[0]);
  }

  async #read(file) {
    const filePath = `${this.Manager.Path.CurrPath}/${file}`;

    const result = await checkFile(filePath);
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
  }
}
