import { LoggerTransport } from "../interfaces/LoggerTransport";

export class ConsoleTransport implements LoggerTransport<string> {
  public readonly name = "console";

  async log(formattedEntry: string): Promise<void> {
    process.stdout.write(`${formattedEntry}\n`);
  }
}
