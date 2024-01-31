import { IExecuteValue } from "../Base/BaseCommand.mjs";

import { statSync } from "fs";

export class CommandCD extends IExecuteValue {
  async Execute(value) {
    const temp = this.Manager.Path.CurrPath + "/" + value;
    const result = this.#checkPathType(temp);
    if (result) {
      this.Manager.Path.CurrPath = value;
      console.log(this.Manager.Path.CurrPath);
    }
  }

  #checkPathType(path) {
    try {
      const stats = statSync(path);

      if (stats.isFile()) {
        console.log("Это файл");
        return false;
      } else if (stats.isDirectory()) {
        console.log("Это папка");
        return true;
      } else {
        console.log("Неизвестный тип");
        return false;
      }
    } catch (error) {
      console.log("Ошибка при определении типа пути:", error);
      return false;
    }
  }
}
