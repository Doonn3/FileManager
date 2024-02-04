import { IExecuteValue } from "./BaseCommand.mjs";
import { printInvalidInput, printOperationFailed } from "../utils/utils.mjs";
import { createHash } from "crypto";
import { createReadStream } from "fs";

export class CommandHashCalc extends IExecuteValue {
  async Execute(value) {
    console.log(value, "<><><>>");
    if (!value || value.length < 1 || value.join().length < 1) {
      printInvalidInput();
      return;
    }

    await this.#calculateHash(value);
  }

  async #calculateHash(file) {
    const pathToFile = `${this.Manager.Path.CurrPath}/${file}`;

    const hash = createHash("sha256");
    try {
      const input = createReadStream(pathToFile, "utf-8");

      input.on("readable", () => {
        const data = input.read();
        if (data) {
          const result = hash.update(data);
          console.log(`HEX: ${result.digest("hex")}`);
          console.log(`HEX: ${result}`);
        }
      });

      input.on("error", () => {
        printOperationFailed();
      });
    } catch (error) {
      printOperationFailed();
    }

    // Write your code here
  }
}
