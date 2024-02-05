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
  #path;

  #app;

  get Path() {
    return this.#path;
  }

  #commandContainer = new CommandContainer();

  constructor(app) {
    this.#app = app;
    this.#path = new PathController(app);
  }

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
    this.#commandContainer.addCommand(
      consts.COMPRESS,
      new CommandCompress(this)
    );
    this.#commandContainer.addCommand(
      consts.DE_COMPRESS,
      new CommandDeCompress(this)
    );
  }

  Execute(data) {
    const result = newParseCommand(data);

    const command = this.#commandContainer.getCommand(result.command);
    if (command === null) return;
    command.Execute(result.params);
  }
}

import path from "path";
import { homedir } from "os";
import { CommandCompress } from "./Commands/CommandCompress.mjs";
import { CommandDeCompress } from "./Commands/CommandDeCompress.mjs";

class PathController {
  // #rootPath = "./FileManager/RootDir";
  // #rootPath = path.parse(process.cwd()).root;
  #rootPath = homedir();
  #chunk = [];
  #currPath = this.#rootPath;

  #app;
  constructor(app) {
    this.#app = app;
  }

  get RootPath() {
    return this.#rootPath;
  }

  get CurrPath() {
    return this.#currPath;
  }

  set CurrPath(path) {
    if (path === undefined || path === "") return;
    this.#chunk.push(path);

    const p = this.#rootPath + this.#chunk.map((p) => `/${p}`).join("");
    this.#currPath = p;

    console.log('asdasd');
    this.#app.Print();
  }

  SetCurrPath(path) {
    if (path === undefined || path === "") return;
    this.#chunk.push(path);

    const p = this.#rootPath + this.#chunk.map((p) => `/${p}`).join("");
    this.#currPath = p;
    this.#app.Print();
  }

  PrevPath() {
    if (this.#chunk.length < 1) return null;

    this.#chunk.pop();

    const p = this.#chunk.map((p) => `/${p}`).join("");

    this.#currPath = this.#rootPath + p;
    return this.#currPath;
  }
}
