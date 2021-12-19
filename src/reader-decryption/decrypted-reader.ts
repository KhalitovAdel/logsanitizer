export class DecryptedReader<T, D> {
    constructor(
        private readonly reader: ReaderDecrypted.Reader<T>,
        private readonly decryption: ReaderDecrypted.Decryption<T, D>
    ) {}

    public [Symbol.asyncIterator](): AsyncIterator<D> {
        return {
            next: async (...args): Promise<IteratorResult<D>> => {
                let result = await this.reader[Symbol.asyncIterator]().next(
                    ...args
                );

                if (!result.value && !result.done)
                    return this[Symbol.asyncIterator]().next(...args);

                // Sry but I can't return value = undefined, because of types(
                if (result.done)
                    return {
                        done: result.done,
                    } as unknown as IteratorResult<D>;

                return {
                    done: !!result.done,
                    value: await this.decryption.exec(result.value),
                };
            },
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
