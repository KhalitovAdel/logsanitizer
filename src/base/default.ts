import { LogFactory } from "../log";
import { ReaderDecryption } from "../reader-decryption";
import { JsonTransport } from "../transport";

/**
 * I can't do that class as some abstract think, because:
 * 1) This is subject area of the task
 * 2) Now I don't know how the application will grow.
 */
export class Default {
  public async parse(inputPath: string, outputPath: string): Promise<void> {
    const reader = ReaderDecryption.createDecryptedReader(inputPath);
    const transport = new JsonTransport(outputPath);

    for await (const raw of reader) {
      try {
        const log = LogFactory.createLog(raw.logLevel, raw.jsonData);

        if (log.getLevel() !== "error") continue;

        if (raw.date) {
          log.setDate(raw.date);
        }

        await transport.exec(log);
      } catch (e) {
        // can log here
      }
    }
    await transport.close();
  }
}
