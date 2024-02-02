import { IExecute } from "../Base/BaseCommand.mjs";
import { readdir, stat } from "fs/promises";
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
  async #printFilesTable(files) {
    const data = [];
    for (const file of files) {
      const result = stat(`${this.Manager.Path.CurrPath}/${file}`);
      data.push({ promise: result, fileName: file });
    }

    const stats = await Promise.all(data.map((stat) => stat.promise));

    const dataType = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const fileStat = stats[i];
      if (fileStat.isFile()) {
        dataType.push({ Name: file, Type: "file" });
      } else if (fileStat.isDirectory()) {
        dataType.push({ Name: file, Type: "directory" });
      }
    }

    dataType.sort((a, b) => {
      if (a.Type === "directory" && b.Type !== "directory") {
        return -1;
      } else if (a.Type !== "directory" && b.Type === "directory") {
        return 1;
      } else {
        return a.Name.localeCompare(b.Name); // Если типы элементов одинаковы, сортируем их по алфавиту
      }
    });

    console.log();
    console.table(dataType);
  }
}
