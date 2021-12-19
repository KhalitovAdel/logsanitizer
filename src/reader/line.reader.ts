import { createReadStream, ReadStream } from 'fs';
import { createInterface } from 'readline';

import { AbstractReader } from './abstract.reader';

export class LineReader extends AbstractReader {
    private readonly readStream: ReadStream;
    private readonly lineInterface: ReturnType<typeof createInterface>;
    public [Symbol.asyncIterator]: () => AsyncIterableIterator<string>;

    constructor(path: string) {
        super();
        this.readStream = createReadStream(path);
        this.lineInterface = createInterface(this.readStream);
        this[Symbol.asyncIterator] = this.lineInterface[
            Symbol.asyncIterator
        ].bind(this.lineInterface);
    }
}
