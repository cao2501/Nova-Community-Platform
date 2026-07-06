import { promises as fs } from "fs";
import { LoggerTransport } from "../interfaces/LoggerTransport";

export class FileTransport implements LoggerTransport<string> {
  public readonly name = "file";
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async log(formattedEntry: string): Promise<void> {
    await fs.appendFile(this.filePath, `${formattedEntry}\n`, "utf8");
  }
}
