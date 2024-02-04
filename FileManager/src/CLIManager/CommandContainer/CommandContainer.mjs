export class CommandContainer {
  #command = new Map();

  addCommand(key, command) {
    if (!this.#command.has(key)) {
      this.#command.set(key, command);
    }
  }

  getCommand(key) {
    if (this.#command.has(key)) {
      return this.#command.get(key);
    }
    return null;
  }

  has(key) {
    return this.#command.has(key);
  }
}
