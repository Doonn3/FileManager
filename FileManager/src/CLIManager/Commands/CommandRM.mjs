import { IExecuteValue } from "./BaseCommand.mjs";
import {
  checkAccess,
  checkStat,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";
import { unlink, rm } from "fs/promises";

export class CommandRM extends IExecuteValue {
  async Execute(args) {
    if (args.length > 1 || args.length === 0) {
      printInvalidInput();
      return;
    }

    this.#removeFile(args[0]);
  }

  async #removeFile(file) {
    const path = `${this.Manager.Path.CurrPath}/${file}`;
    try {
      const result = await checkAccess(path);

      if (result === false) throw new Error("FS operation failed");

      const stat = await checkStat(path);

      if (stat.isFile()) {
        await unlink(path, true);
      }

      if (stat.isDirectory()) {
        await rm(path, { recursive: true });
      }
    } catch (err) {
      printOperationFailed();
    }
  }
}
