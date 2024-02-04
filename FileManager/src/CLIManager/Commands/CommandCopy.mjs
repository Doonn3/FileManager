import { IExecuteValue } from "./BaseCommand.mjs";

import {
  checkFile,
  checkStatus,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";

import { createReadStream, createWriteStream } from "fs";
import { cp } from "fs/promises";

export class CommandCopy extends IExecuteValue {
  async Execute(value) {
    const pathFile = value[0];
    const newPathFile = value[1];

    await this.#copyFiles(pathFile, newPathFile);
  }

  async #copyFiles(oldF, newF) {
    const oldPath = `${this.Manager.Path.CurrPath}/${oldF}`;
    const newPath = `${this.Manager.Path.CurrPath}/${newF}`;

    const resultOld = await checkFile(oldPath);
    const resultNew = await checkFile(newPath);

    if (resultOld === false) {
      printOperationFailed();
      return;
    }

    if (resultNew === true) {
      printOperationFailed();
      return;
    }

    try {
      const result = await checkStatus(oldPath);

      if (result.isFile()) {
        const readableStream = await createReadStream(oldPath);

        const writableStream = await createWriteStream(newPath);

        readableStream.pipe(writableStream);

        writableStream.on("end", () => {
          console.log("Файл успешно скопирован.\n");
          readableStream.destroy();
          writableStream.destroy();
        });

        // Обработка ошибок
        readableStream.on("error", (error) => {
          printOperationFailed();
          readableStream.destroy();
        });

        writableStream.on("error", (error) => {
          printOperationFailed();
          writableStream.destroy();
        });
      }

      if (result.isDirectory()) {
        cp(oldPath, newPath, { recursive: true });
      }
    } catch (error) {
      printInvalidInput();
    }
  }
}
