export abstract class AbstractReader {
    public abstract [Symbol.asyncIterator](): AsyncIterator<string>;
}
