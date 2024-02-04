import { IExecuteValue } from "./BaseCommand.mjs";
import { checkFile, newParseCommand } from "../utils/utils.mjs";
import { unlink } from "fs/promises";

export class CommandRM extends IExecuteValue {
  async Execute(value) {
    const result = newParseCommand(value);

    console.log(result);
    this.#removeFile(result.command);
  }

  async #removeFile(file) {
    const path = `${this.Manager.Path.CurrPath}/${file}`;
    try {
      const result = await checkFile(path);

      if (result === false) throw new Error("FS operation failed");

      console.log("Удаляю...");
      await unlink(path, true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
