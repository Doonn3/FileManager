import { IExecuteValue } from "./BaseCommand.mjs";

import {
  checkAccess,
  checkStat,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";

import { createReadStream, createWriteStream } from "fs";
import { cp, unlink } from "fs/promises";

import path from "path";

export class CommandMove extends IExecuteValue {
  async Execute(args) {
    if (args.length > 2 || args.length === 0 || args.length < 2) {
      printInvalidInput();
      return;
    }

    const pathFile = args[0];
    const newPathFile = args[1];

    await this.#moveFile(pathFile, newPathFile);
  }

  async #moveFile(source, moveTo) {
    const sourceFilePath = `${this.Manager.Path.CurrPath}/${source}`;
    // const destinationFolder = `${this.Manager.Path.CurrPath}/${moveTo}`;
    const destinationFilePath = path.join(
      this.Manager.Path.CurrPath,
      moveTo,
      source
    );

    // console.log(sourceFilePath);
    // console.log(destinationFilePath);
    // console.log(destinationFolder);

    const resultSource = await checkAccess(sourceFilePath);

    if (resultSource === false) {
      printOperationFailed();
      return;
    }

    try {
      const result = await checkStat(sourceFilePath);

      if (result.isFile()) {
        const sourceStream = createReadStream(sourceFilePath);

        const destinationStream = createWriteStream(destinationFilePath);

        sourceStream.pipe(destinationStream);

        sourceStream.on("end", () => {
          console.log("Файл успешно перемещён.\n");
          unlink(sourceFilePath);
          sourceStream.destroy();
        });

        // Обработка ошибок
        sourceStream.on("error", (error) => {
          printOperationFailed();
          sourceStream.destroy();
        });

        destinationStream.on("error", (error) => {
          console.error("Ошибка при записи в целевой файл:", error);
          printOperationFailed();
          destinationStream.destroy();
        });
      } else {
        printOperationFailed();
      }
    } catch (error) {
      printInvalidInput();
    }
  }
}
