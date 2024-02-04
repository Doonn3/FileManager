import { CommandContainer } from "./CommandContainer/CommandContainer.mjs";
import { CommandUp } from "./Commands/CommandUp.mjs";
import { CommandCD } from "./Commands/CommandCD.mjs";
import { CommandLS } from "./Commands/CommandLS.mjs";
import { newParseCommand } from "./utils/utils.mjs";
import { CommandAdd } from "./Commands/CommandAdd.mjs";
import { CommandRM } from "./Commands/CommandRM.mjs";
import { CommandRename } from "./Commands/CommandRename.mjs";
import { CommandRead } from "./Commands/CommandRead.mjs";
import { CommandOS } from "./Commands/CommandOS.mjs";
import { CommandCopy } from "./Commands/CommandCopy.mjs";
import { CommandMove } from "./Commands/CommandMove.mjs";
import { CommandHashCalc } from "./Commands/CommandHashCalc.mjs";
import consts from "./consts/consts.mjs";

export class CLIManager {
  #path = new PathController();

  get Path() {
    return this.#path;
  }

  #commandContainer = new CommandContainer();

  Init() {
    this.#commandContainer.addCommand(consts.UP, new CommandUp(this));
    this.#commandContainer.addCommand(consts.CD, new CommandCD(this));
    this.#commandContainer.addCommand(consts.LS, new CommandLS(this));
    this.#commandContainer.addCommand(consts.ADD, new CommandAdd(this));
    this.#commandContainer.addCommand(consts.RM, new CommandRM(this));
    this.#commandContainer.addCommand(consts.RN, new CommandRename(this));
    this.#commandContainer.addCommand(consts.CAT, new CommandRead(this));
    this.#commandContainer.addCommand(consts.OS, new CommandOS(this));
    this.#commandContainer.addCommand(consts.CP, new CommandCopy(this));
    this.#commandContainer.addCommand(consts.MV, new CommandMove(this));
    this.#commandContainer.addCommand(consts.HASH, new CommandHashCalc(this));
  }

  Execute(data) {
    const result = newParseCommand(data);

    if (result.params.length > 0) {
      const command = this.#commandContainer.getCommand(result.command);
      if (command === null) return;
      command.Execute(result.params);
    } else {
      const command = this.#commandContainer.getCommand(result.command);
      if (command === null) return;
      command.Execute();
    }
  }
}

class PathController {
  #rootPath = "./FileManager/RootDir";
  #chunk = [];
  #currPath = this.#rootPath;

  get RootPath() {
    return this.#rootPath;
  }

  get CurrPath() {
    return this.#currPath;
  }

  set CurrPath(path) {
    if (path === undefined || path === "") return;
    this.#chunk.push(path);

    this.#currPath = this.#rootPath + this.#chunk.map((p) => `/${p}`).join();
  }

  PrevPath() {
    if (this.#chunk.length < 1) return null;
    console.log(this.#chunk);
    const arr = this.#chunk.toReversed();
    arr.pop();

    const p = arr.map((p) => `/${p}`).join();

    this.#chunk = arr.toReversed();

    this.#currPath = this.#rootPath + p;
    console.log(this.#currPath);
    return this.#currPath;
  }
}
