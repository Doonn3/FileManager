import { IExecuteValue } from "../Base/BaseCommand.mjs";

import { statSync } from "fs";

export class CommandCD extends IExecuteValue {
  async Execute(value) {
    const temp = this.Manager.Path.CurrPath + "/" + value;
    const result = this.#checkPathType(temp);
    if (result) {
      this.Manager.Path.CurrPath = value;
    }
  }

  #checkPathType(path) {
    try {
      const stats = statSync(path);

      if (stats.isFile()) {
        return false;
      } else if (stats.isDirectory()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Ошибка при определении типа пути:", error);
      return false;
    }
  }
}
