import { IExecuteValue } from "./BaseCommand.mjs";
import { rename } from "fs/promises";
import {
  newParseCommand,
  checkAccess,
  printOperationFailed,
} from "../utils/utils.mjs";

export class CommandRename extends IExecuteValue {
  async Execute(value) {
    this.#renameFile(value[0], value[1]);
  }

  async #renameFile(oldFlie, newFile) {
    const oldPath = `${this.Manager.Path.CurrPath}/${oldFlie}`;
    const newPath = `${this.Manager.Path.CurrPath}/${newFile}`;
    console.log(oldPath);
    try {
      const input = await checkAccess(oldPath);
      const out = await checkAccess(newPath);

      if (input === false) {
        console.log("Входного файла не существует.");
        throw new Error("FS operation failed");
      }

      if (out) {
        console.log("Такой файл с именем и расширением существует.");
        throw new Error("FS operation failed");
      } else {
        rename(oldPath, newPath);
      }
    } catch (err) {
      printOperationFailed();
    }
  }
}
