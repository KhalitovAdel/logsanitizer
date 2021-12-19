import * as fs from "fs";
import { stringify } from "JSONStream";

import { AbstractTransport } from "./abstract.transport";

export class JsonTransport extends AbstractTransport {
  private readonly stream: NodeJS.ReadWriteStream;

  constructor(path: string) {
    super();
    this.stream = stringify();
    this.stream.pipe(fs.createWriteStream(path));
  }

  public async exec(log: AbstractTransport.LogType): Promise<void> {
    await new Promise<void>((res, rej) => {
      this.stream.write(
        JSON.stringify({
          timestamp: log.getDate().getTime(),
          loglevel: log.getLevel(),
          ...log.toJSON(),
        }),
        (err) => {
          if (err) return rej(err);
          res();
        }
      );
    });
  }

  public async close(): Promise<void> {
    await new Promise<void>((res) => {
      this.stream.end(res);
    });
  }
}
