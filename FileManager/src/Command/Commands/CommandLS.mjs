import { IExecute } from "../Base/BaseCommand.mjs";
import { readdir } from "fs/promises";
import { checkFile } from "../utils/utils.mjs";

export class CommandLS extends IExecute {
  async Execute() {
    const path = this.Manager.Path.CurrPath;
    try {
      const result = await checkFile(path);

      if (result) {
        const files = await readdir(path);
        this.#printFilesTable(files);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // TODO >> папки и файлы сортируются по алфавиту по возрастанию, но список папок идет первым
  #printFilesTable(files) {
    const zz = [];

    for (const file of files) {
      if (file.split(".").length > 1) {
        zz.push({ Name: file, Type: "file" });
      } else {
        zz.push({ Name: file, Type: "directory" });
      }
    }

    console.log();
    console.table(zz);
  }
}
