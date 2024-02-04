import { IExecute } from "./BaseCommand.mjs";

export class CommandUp extends IExecute {
  Execute() {
    this.Manager.Path.PrevPath();
  }
}
