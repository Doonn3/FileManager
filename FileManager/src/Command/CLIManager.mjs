import path, { dirname } from "path";

const __dirname = dirname(import.meta.url);

import { CommandList } from "./List/CommandList.mjs";
import { CommandUp } from "./Commands/CommandUp.mjs";
import { CommandCD } from "./Commands/CommandCD.mjs";
import { CommandLS } from "./Commands/CommandLS.mjs";
import { newParseCommand, parseCommand } from "./utils/utils.mjs";
import { CommandAdd } from "./Commands/CommandAdd.mjs";
import { CommandRM } from "./Commands/CommandRM.mjs";
import { CommandRename } from "./Commands/CommandRename.mjs";
import { CommandRead } from "./Commands/CommandRead.mjs";
import { CommandOS } from "./Commands/CommandOS.mjs";

export class CLIManager {
  #path = new Path();

  get Path() {
    return this.#path;
  }

  #commandList = new CommandList();

  Init() {
    this.#commandList.addCommand("up", new CommandUp(this));
    this.#commandList.addCommand("cd", new CommandCD(this));
    this.#commandList.addCommand("ls", new CommandLS(this));
    this.#commandList.addCommand("add", new CommandAdd(this));
    this.#commandList.addCommand("rm", new CommandRM(this));
    this.#commandList.addCommand("rn", new CommandRename(this));
    this.#commandList.addCommand("cat", new CommandRead(this));
    this.#commandList.addCommand("os", new CommandOS(this));
  }

  Execute(data) {
    // const result = parseCommand(data);

    // if (result.params) {
    //   const command = this.#commandList.getCommand(result.command);
    //   if (command === null) return;
    //   command.Execute(result.params);
    // } else {
    //   const command = this.#commandList.getCommand(result.command);
    //   if (command === null) return;
    //   command.Execute();
    // }
    const result = newParseCommand(data);

    if (result.params.length > 0) {
      const command = this.#commandList.getCommand(result.command);
      if (command === null) return;
      command.Execute(result.params);
    } else {
      const command = this.#commandList.getCommand(result.command);
      if (command === null) return;
      command.Execute();
    }
  }
}

class Path {
  // #rootPath = path.join(import.meta.url, "../../../RootDir");
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
