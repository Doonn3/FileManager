import { IExecuteValue } from "../Base/BaseCommand.mjs";
import { readFile } from "fs/promises";
import { checkFile, log } from "../utils/utils.mjs";

export class CommandRead extends IExecuteValue {
  async Execute(value) {
    await this.#read(value[0]);
  }

  async #read(file) {
    const filePath = `${this.Manager.Path.CurrPath}/${file}`;
    console.log(filePath);
    try {
      const result = await checkFile(filePath);
      if (result === false) throw new Error("Operation failed");
      const content = await readFile(filePath, "utf-8");
      console.log(content);
    } catch (err) {
      log().yellow(err.message);
      return err;
    }
  }
}
