import { IExecuteValue } from "./BaseCommand.mjs";
import {
  checkAccess,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";
import { writeFile, mkdir } from "fs/promises";

export class CommandAdd extends IExecuteValue {
  async Execute(args) {
    if (args.length > 2 || args.length === 0) {
      printInvalidInput();
      return;
    }

    if (args[0] === "mkdir") {
      await this.#createFolder(args[1]);
    } else {
      await this.#createFile(args[0]);
    }
  }

  async #createFile(file) {
    const path = `${this.Manager.Path.CurrPath}/${file}`;
    const result = await checkAccess(path);
    if (result) {
      printOperationFailed();
    } else {
      writeFile(path, file)
        .then(() => console.log("file save"))
        .catch((err) => printOperationFailed());
    }
  }

  async #createFolder(folder) {
    const path = `${this.Manager.Path.CurrPath}/${folder}`;
    mkdir(path, (err) => {
      if (err) {
        printOperationFailed();
      }
      console.log("Папка успешно создана");
    });
  }
}
