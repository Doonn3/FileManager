import { IExecuteValue } from "./BaseCommand.mjs";

import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { printInvalidInput, printOperationFailed } from "../utils/utils.mjs";

export class CommandDeCompress extends IExecuteValue {
  Execute(args) {
    if (args.length > 2 || args.length === 0 || args.length < 2) {
      printInvalidInput();
      return;
    }

    this.#deCompress(args[0], args[1]);
  }

  #deCompress(pathToFile, destination) {
    let fileName = pathToFile;

    if (path.extname(fileName) === ".br") {
      fileName = fileName.slice(0, -3);
    }

    const pathFile = `${this.Manager.Path.CurrPath}/${pathToFile}`;
    const dest = path.join(
      `${this.Manager.Path.CurrPath}/${destination}`,

      fileName
    );

    console.log(dest);

    try {
      const sourceStream = createReadStream(pathFile);
      const destinationStream = createWriteStream(dest);
      const brotliStream = createBrotliDecompress();
      sourceStream.pipe(brotliStream).pipe(destinationStream);

      sourceStream.on("error", () => {
        printOperationFailed();
      });
      destinationStream.on("error", (err) => {
        console.log(err);
        printOperationFailed();
      });
      brotliStream.on("error", () => {
        printOperationFailed();
      });
    } catch (error) {
      printOperationFailed();
    }
  }
}
