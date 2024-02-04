import { createInterface } from "readline";
import { CLIManager } from "./CLIManager/CLIManager.mjs";
import { WELCOM_FILE_MANAGER } from "./consts/consts.mjs";

class StartParserArgs {
  #command = "--username";

  Parse(argv) {
    let entryCommand = "";

    for (const args of argv) {
      if (args.startsWith("--")) {
        entryCommand = args;
        console.log(args, "ARGV");
      }
    }

    const split = entryCommand.split("=");

    if (split[0] === this.#command) {
      const param = split[1] || null;
      return param;
    }

    return null;
  }
}

export class CLIApp {
  #rdpi = new ReadLineProcessInput();
  #parseArgs = new StartParserArgs();
  #userName = "";

  ParseArgs = (argv) => {
    const result = this.#parseArgs.Parse(argv);
    if (result) {
      this.#printUserName(result);
      this.#rdpi.StartProcessInput(this.#userName);
    } else {
      console.log("Не было указано имя");
      console.log("Добавлено Дефолтное Имя User");
      this.#printUserName("User");
      this.#rdpi.StartProcessInput(this.#userName);
    }
  };

  #printUserName(name) {
    console.log(`Welcome to the File Manager, ${name}!`);
    console.log(WELCOM_FILE_MANAGER);
    this.#userName = name;
  }
}

class ReadLineProcessInput {
  #rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  #manager = new CLIManager();

  #userName = "";

  constructor() {
    this.#manager.Init();
  }

  StartProcessInput(name) {
    this.#userName = name;
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

    this.#manager.Execute(input, () => {
      console.log("123");
      this.#printPromt();
    });

    this.#printPromt();
  };

  #printPromt = () => {
    const currPath = this.#manager.Path.CurrPath.replace(
      "FileManager",
      ""
    ).replace(".//", "");
    const prompt = `FileManager>>[${this.#userName}]~/${currPath}/$ `;
    this.#rl.setPrompt(prompt);

    this.#rl.prompt();
  };
}
