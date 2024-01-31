// const parseEnv = (env) => {
// console.log(env);
// for (const key in env) {
//   if (key.startsWith("RSS")) {
//     console.log(`${key}=${env[key]}`);
//   }
// }
// Write your code here
//   };

//   parseEnv(process.env);

import { createInterface } from "readline";
import { CLIManager } from "./Command/CLIManager.mjs";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const manager = new CLIManager();
manager.Init();

function processInput(input) {
  if (input === "exit") {
    console.log("Thank you for using File Manager, Username, goodbye!");
    rl.close();
    process.exit();
  }

  // Обработка введенной команды
  console.log("Вы ввели команду:", input);

  manager.Execute(input);

  console.log(input);

  // Продолжение ожидания ввода
  rl.prompt(true);
}

rl.prompt();
rl.on("line", processInput);
rl.on("SIGINT", () => {
  console.log("Thank you for using File Manager, Username, goodbye!");
  rl.close();
  process.exit();
});

// class CLICommandList {
//   #map = new Map();

//   addCommand(command, value) {
//     if (!this.#map.has(command)) {
//       this.#map.set(command, value);
//     }
//   }

//   getCommand(key) {
//     if (this.#map.has(key)) {
//       this.#map.get(key);
//     } else {
//       console.log("Такой команды не существует");
//     }
//   }

//   getAll() {
//     console.log(this.#map.entries());
//     console.log(this.#map.keys());
//     console.log(this.#map.values());
//   }

//   has(key) {
//     return this.#map.has(key);
//   }
// }

// const map = new CLICommandList();
// map.addCommand("--username", "--username");
// map.addCommand(".exit", ".exit");

// const parseArgs = (argv) => {
//   for (const args of argv) {
//     if (args.startsWith("--")) {
//       const data = parseCommand(args);
//       if (map.has(data.command)) {
//         printUserName(data.value);
//       } else {
//         console.log(
//           `Неизвестная Команда >> ${data.command} сo значением ${data.value}`
//         );
//       }
//     }
//   }
// };

// parseArgs(process.argv);

// function parseCommand(command) {
//   const data = command.split("=");
//   return { command: data[0], value: data[1] };
// }

// function printUserName(name) {
//   console.log(`Welcome to the File Manager, ${name}!`);
// }
