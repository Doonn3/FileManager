import { createInterface } from "readline";
import { CLIManager } from "./CLIManager/CLIManager.mjs";
import { WELCOM_FILE_MANAGER } from "./consts/consts.mjs";
import { ParseArgs } from "./ParserArgs/ParserArgs.mjs";

export class CLIApp {
  #rdpi = new ReadLineProcessInput();

  #parser = new ParseArgs({
    username: {
      type: "string",
    },
  });

  ParseArgs = (argv) => {
    const result = this.#parser.Parse(argv);

    if (result) {
      this.#printUserName(result.values.username);
      this.#rdpi.StartProcessInput(result.values.username);
    } else {
      console.log("Не было указано имя");
      console.log("Добавлено Дефолтное Имя User");
      this.#printUserName("User");
      this.#rdpi.StartProcessInput("User");
    }
  };

  #printUserName(name) {
    console.log(`Welcome to the File Manager, ${name}!`);
    console.log(WELCOM_FILE_MANAGER);
  }
}

class ReadLineProcessInput {
  #rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  #manager = new CLIManager(this);

  #userName = "";

  constructor() {
    this.#manager.Init();
  }

  StartProcessInput(name) {
    this.#userName = name;
    this.#printPromt();

    this.#rl.on("line", this.#processInput);
    this.#rl.on("SIGINT", () => {
      console.log(
        `Thank you for using File Manager, ${this.#userName}, goodbye!`
      );
      this.#rl.close();
      process.exit();
    });
  }

  #processInput = (input) => {
    if (input === ".exit") {
      console.log(
        `Thank you for using File Manager, ${this.#userName}, goodbye!`
      );
      this.#rl.close();
      process.exit();
    }

    this.#manager.Execute(input);

    this.#printPromt();
  };

  #printPromt = () => {
    const path = this.#manager.Path.CurrPath;

    const text = "You are currently in ";
    const prompt = `${text}[${this.#userName}@${path}]$ `;
    this.#rl.setPrompt(prompt);

    this.#rl.prompt();
  };

  Print() {
    this.#printPromt();
  }
}
