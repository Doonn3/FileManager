import { createInterface } from "readline";
import { CLIManager } from "./Command/CLIManager.mjs";
import { WELCOM_FILE_MANAGER } from "./consts/consts.mjs";

export class ReadLine {
  #rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  #manager = new CLIManager();
  #userName = "";

  constructor() {
    this.#manager.Init();
  }

  ParseArgs = (argv) => {
    for (const args of argv) {
      if (args.startsWith("--")) {
        this.#start(args);
      }
    }
  };

  #start(args) {
    const data = args.split("=");
    if (data[1]) {
      this.#printUserName(data[1]);
      this.#startProcessInput();
    } else {
      console.log("Не было указано имя");
      console.log("Добавлено Дефолтное Имя User");
      this.#printUserName("User");
      this.#startProcessInput();
    }
  }

  #printUserName(name) {
    console.log(`Welcome to the File Manager, ${name}!`);
    console.log(WELCOM_FILE_MANAGER);
    this.#userName = name;
  }

  #startProcessInput() {
    this.#printPromt();
    this.#rl.on("line", this.#processInput);
    this.#rl.on("SIGINT", () => {
      console.log("Thank you for using File Manager, Username, goodbye!");
      this.#rl.close();
      process.exit();
    });
  }

  #processInput = (input) => {
    if (input === "exit") {
      console.log("Thank you for using File Manager, Username, goodbye!");
      this.#rl.close();
      process.exit();
    }

    this.#manager.Execute(input);

    this.#printPromt();
  };

  #printPromt = () => {
    this.#rl.setPrompt(
      `FileManager>>[${this.#userName}]~/${this.#manager.Path.CurrPath.replace(
        "FileManager",
        ""
      ).replace(".//", "")}/$ `
    );
    this.#rl.prompt();
  };
}
