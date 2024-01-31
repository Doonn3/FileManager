import { access } from "fs/promises";

export function parseCommand(value) {
  const data = value.split(" ");

  return { command: data[0], params: data[1] };
}

export async function checkFile(file) {
  try {
    await access(file);
    return true;
  } catch (err) {
    console.log(`Нет такого файла. <<${file}>>`);
    return false;
  }
}
