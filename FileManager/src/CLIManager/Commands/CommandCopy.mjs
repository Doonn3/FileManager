import { IExecuteValue } from "./BaseCommand.mjs";

import {
  checkAccess,
  checkStat,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";

import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { cp } from "fs/promises";

export class CommandCopy extends IExecuteValue {
  async Execute(args) {
    if (args.length > 2 || args.length === 0 || args.length < 2) {
      printInvalidInput();
      return;
    }

    const pathFile = args[0];
    const newPathFile = args[1];

    await this.#copyFiles(pathFile, newPathFile);
  }

  async #copyFiles(oldF, newF) {
    const oldPath = `${this.Manager.Path.CurrPath}/${oldF}`;

    const newPath = path.join(this.Manager.Path.CurrPath, newF, oldF);

    const resultOld = await checkAccess(oldPath);

    console.log(resultOld);

    if (resultOld === false) {
      printOperationFailed();
      return;
    }
    try {
      const result = await checkStat(oldPath);

      if (result.isFile()) {
        const readableStream = createReadStream(oldPath);

        const writableStream = createWriteStream(newPath);

        readableStream.pipe(writableStream);

        readableStream.on("end", () => {
          console.log("Файл успешно скопирован.\n");
          readableStream.destroy();
        });

        // Обработка ошибок
        readableStream.on("error", (error) => {
          printOperationFailed();
          readableStream.destroy();
        });

        writableStream.on("error", (error) => {
          console.log(error);
          printOperationFailed();
          writableStream.destroy();
        });
      }

      // if (result.isDirectory()) {
      // cp(oldPath, newPath, { recursive: true });
      // }
    } catch (error) {
      printInvalidInput();
    }
  }
}
