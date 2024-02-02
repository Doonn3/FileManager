import { IExecuteValue } from "../Base/BaseCommand.mjs";
import { rename } from "fs/promises";
import { newParseCommand, checkFile } from "../utils/utils.mjs";

export class CommandRename extends IExecuteValue {
  async Execute(value) {
    // const result = newParseCommand(value);
    // console.log("RENAME COMMAND>>", result);
    console.log("RENAME COMMAND>>", value);
    this.#renameFile(value[0], value[1]);
  }

  async #renameFile(oldFlie, newFile) {
    const oldPath = `${this.Manager.Path.CurrPath}/${oldFlie}`;
    const newPath = `${this.Manager.Path.CurrPath}/${newFile}`;
    console.log(oldPath);
    try {
      const input = await checkFile(oldPath);
      const out = await checkFile(newPath);

      console.log(input);

      if (input === false) {
        console.log("Входного файла не существует.");
        new Error("FS operation failed");
        return;
      }

      if (out) {
        console.log("Такой файл с именем и расширением существует.");
        throw new Error("FS operation failed");
      } else {
        console.log("Переименовываем....");
        rename(oldPath, newPath);
      }
    } catch (err) {
      console.error(err);
      new Error(err);
    }
  }
}
