export abstract class AbstractReader {
  public abstract [Symbol.asyncIterator](): AsyncIterableIterator<string>;
}
