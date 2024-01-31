export class BaseCommand {
  #manager;

  get Manager() {
    return this.#manager;
  }

  constructor(manager) {
    this.#manager = manager;
  }
}

export class IExecuteValue extends BaseCommand {
  constructor(manager) {
    super(manager);
  }
  Execute(value) {}
}

export class IExecute extends BaseCommand {
  constructor(manager) {
    super(manager);
  }

  Execute() {}
}
