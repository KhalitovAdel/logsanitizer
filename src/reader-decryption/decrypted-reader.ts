export class DecryptedReader<T, D> {
  constructor(
    private readonly reader: ReaderDecrypted.Reader<T>,
    private readonly decryption: ReaderDecrypted.Decryption<T, D>
  ) {}

  public [Symbol.asyncIterator](): AsyncIterableIterator<D> {
    const cursor = this.reader[Symbol.asyncIterator]();

    return {
      next: async (...args): Promise<IteratorResult<D>> => {
        const result = await cursor.next(...args);

        return {
          done: !!result.done,
          value: await this.decryption.exec(result.value),
        };
      },
      [Symbol.asyncIterator]: this[Symbol.asyncIterator].bind(this),
    };
  }
}

export namespace ReaderDecrypted {
  export interface Reader<T> {
    [Symbol.asyncIterator]: () => AsyncIterableIterator<T>;
  }

  export interface Decryption<T, D> {
    exec(value: T): D | Promise<D>;
  }
}
