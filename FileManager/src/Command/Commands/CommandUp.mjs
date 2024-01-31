import { IExecute } from "../Base/BaseCommand.mjs";

export class CommandUp extends IExecute {
  Execute() {
    this.Manager.Path.PrevPath();
  }
}
