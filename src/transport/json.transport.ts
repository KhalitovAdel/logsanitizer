import * as fs from 'fs';
import { WriteStream } from 'fs';
import { stringify } from 'JSONStream';

import { AbstractTransport } from './abstract.transport';

export class JsonTransport extends AbstractTransport {
    private readonly stream: NodeJS.ReadWriteStream;
    private readonly coreStream: WriteStream;

    constructor(path: string) {
        super();
        this.stream = stringify('[', ',', ']');
        this.coreStream = fs.createWriteStream(path);
        this.stream.pipe(this.coreStream);
    }

    /**
     *
     * Async to future, because currently callback not working
     * https://github.com/dominictarr/JSONStream/issues/79
     * Example:
     *
     * await new Promise<void>((res, rej) => {
            this.stream.write(
                JSON.stringify({
                    timestamp: log.getDate().getTime(),
                    loglevel: log.getLevel(),
                    ...log.toJSON(),
                }),
                (err) => { //This callback never call
                    if (err) return rej(err);
                    res();
                }
            );
        });
     */
    public async exec(log: AbstractTransport.LogType): Promise<void> {
        this.stream.write({
            timestamp: log.getDate().getTime(),
            loglevel: log.getLevel(),
            ...log.toJSON(),
            // 5mln users and so bad syntax, it's working only like that.
        } as any);
    }

    /**
     * Same problem with callback as in exec
     * How 5mln people using that library?
     */
    public async close(): Promise<void> {
        this.stream.end();
    }
}
