import { IExecuteValue } from "./BaseCommand.mjs";

import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { printInvalidInput, printOperationFailed } from "../utils/utils.mjs";

export class CommandCompress extends IExecuteValue {
  Execute(args) {
    if (args.length > 2 || args.length === 0 || args.length < 2) {
      printInvalidInput();
      return;
    }

    this.#compress(args[0], args[1]);
  }

  #compress(pathToFile, destination) {
    const pathFile = `${this.Manager.Path.CurrPath}/${pathToFile}`;
    const dest = path.join(
      `${this.Manager.Path.CurrPath}/${destination}`,

      `${pathToFile}.br`
    );

    console.log(dest);

    try {
      const sourceStream = createReadStream(pathFile);
      const destinationStream = createWriteStream(dest);
      const brotliStream = createBrotliCompress();
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
