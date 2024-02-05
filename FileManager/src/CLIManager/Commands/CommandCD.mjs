import {
  printInvalidInput,
  checkStat,
  printOperationFailed,
  checkAccess,
} from "../utils/utils.mjs";
import { IExecuteValue } from "./BaseCommand.mjs";

export class CommandCD extends IExecuteValue {
  async Execute(args) {
    let require = {};

    args.forEach((param) => {
      if (param.trim() !== "") {
        require[param] = param;
      }
    });

    const keys = Object.keys(require);

    if (keys.length === 0 || keys.length > 1) {
      printInvalidInput();
      return;
    }

    const param = require[keys[0]];

    const temp = this.Manager.Path.CurrPath + "/" + param;
    const result = await this.#statusPath(temp);
    if (result) {
      // this.Manager.Path.CurrPath = param;
      this.Manager.Path.SetCurrPath(param);
    }
  }

  async #statusPath(path) {
    try {
      const resultAccess = await checkAccess(path);

      const resultStats = await checkStat(path);

      if (resultAccess === false) throw new Error();
      if (resultStats.isFile()) throw new Error();
      return true;
    } catch (error) {
      printOperationFailed();
      return false;
    }
  }
}
