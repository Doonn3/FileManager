import { IExecuteValue } from "../Base/BaseCommand.mjs";
import { checkFile, newParseCommand } from "../utils/utils.mjs";
import { writeFile, mkdir } from "fs/promises";

export class CommandAdd extends IExecuteValue {
  async Execute(value) {
    await this.#create(value);
  }

  async #create(name) {
    const result = newParseCommand(name);
    if (result === null) return;

    if (result.command === "mkdir") {
      await this.#createFolder(result.params.join());
    } else {
      await this.#createFile(result.command);
    }
  }

  async #createFile(file) {
    const path = `${this.Manager.Path.CurrPath}/${file}`;
    const result = await checkFile(path);
    if (result) {
      console.log("Такой Файл с Таким Именем Уже Существует.");
    } else {
      writeFile(path, file)
        .then(() => console.log("file save"))
        .catch((err) => console.log(`Error not save file <<${err}>>`));
    }
  }

  async #createFolder(folder) {
    const path = `${this.Manager.Path.CurrPath}/${folder}`;
    mkdir(path, (err) => {
      if (err) throw err; // не удалось создать папку
      console.log("Папка успешно создана");
    });
  }
}
