import { IExecuteValue } from "../Base/BaseCommand.mjs";
import { EOL, cpus, homedir, hostname, arch } from "os";
import { printInvalidInput } from "../utils/utils.mjs";

const doc = [
  {
    command: "--EOL",
    descriptions: [
      "Get EOL (default system End-Of-Line) and print it to console",
      "Получите EOL ( систему по умолчанию End-Of-Line ) и распечатайте ее на консоль",
    ],
  },
  {
    command: "--cpus",
    descriptions: [
      "Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console",
      "Получите информацию о процессорах хост-машины ( общее количество модели CPUS plus и тактовую частоту ( в ГГц ) для каждого из них ) и распечатайте ее на консоли",
    ],
  },
  {
    command: "--homedir",
    descriptions: [
      "Get home directory and print it to console",
      "Получить домашний каталог и распечатать его на консоли",
    ],
  },
  {
    command: "--username",
    descriptions: [
      "Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console",
      "Получить ток имя пользователя системы (Не путайте с именем пользователя, которое устанавливается при запуске приложения) и распечатайте его для консоли",
    ],
  },
  {
    command: "--architecture",
    descriptions: [
      "Get CPU architecture for which Node.js binary has compiled and print it to console",
      "Получите архитектуру CPU, для которой двоичный файл Node.js скомпилировал и распечатайте ее для консоли",
    ],
  },
];

export class CommandOS extends IExecuteValue {
  #data = {
    "--EOL": () => console.log(JSON.stringify(EOL)),
    "--cpus": () => console.log(cpus()),
    "--homedir": () => console.log(homedir()),
    "--username": () => console.log(hostname()),
    "--architecture": () => console.log(arch()),
    "--help": () => {
      doc.forEach((data) => {
        console.log(data.command);

        data.descriptions.forEach((text) => {
          console.log(text);
        });
        console.log();
      });
    },
  };

  Execute(value) {
    if (!value) {
      printInvalidInput();
      return;
    }

    const param = value.join();

    const result = this.#data[param];

    if (result) {
      result();
    } else {
      printInvalidInput();
    }
  }
}
