import { StringLineDecryption } from "../decryption";
import { LineReader } from "../reader";
import { DecryptedReader } from "./decrypted-reader";

export class ReaderDecryptionFactory {
  createDecryptedReader(path: string) {
    return new DecryptedReader(
      new LineReader(path),
      new StringLineDecryption()
    );
  }
}
