import { IExecuteValue } from "./BaseCommand.mjs";

import {
  checkFile,
  checkStatus,
  printInvalidInput,
  printOperationFailed,
} from "../utils/utils.mjs";

import { createReadStream, createWriteStream } from "fs";
import { cp, unlink } from "fs/promises";

import path from "path";

export class CommandMove extends IExecuteValue {
  async Execute(value) {
    const pathFile = value[0];
    const newPathFile = value[1];

    if (!newPathFile) return;

    await this.#moveFile(pathFile, newPathFile);
  }

  async #moveFile(source, moveTo) {
    const sourceFilePath = `${this.Manager.Path.CurrPath}/${source}`;
    const destinationFolder = `${this.Manager.Path.CurrPath}/${moveTo}`;
    // const destinationFilePath = path.join(destinationFolder, sourceFilePath);

    console.log(sourceFilePath);
    // console.log(destinationFilePath);
    console.log(destinationFolder);

    const resultSource = await checkFile(sourceFilePath);

    if (resultSource === false) {
      printOperationFailed();
      return;
    }

    try {
      const result = await checkStatus(sourceFilePath);

      if (result.isFile()) {
        const sourceStream = await createReadStream(sourceFilePath);

        const destinationStream = await createWriteStream(destinationFolder);

        sourceStream.pipe(destinationStream);

        sourceStream.on("end", () => {
          console.log("Файл успешно скопирован.\n");
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
          destinationStream.destroy();
        });
      }
    } catch (error) {
      printInvalidInput();
    }
  }
}
