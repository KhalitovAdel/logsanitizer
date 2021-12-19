export class Default<T extends Default.Log> {
    constructor(
        private readonly reader: Default.Reader,
        private readonly transport: Default.Transport<T>,
        private readonly logFactory: Default.LogFactory<T>
    ) {}

    public async parse(inputPath: string): Promise<void> {
        const reader = this.reader.createDecryptedReader(inputPath);
        for await (const raw of reader) {
            try {
                const log = this.logFactory.createLog(
                    raw.logLevel,
                    raw.jsonData
                );

                if (log.getLevel() !== 'error') continue;

                if (raw.date) {
                    log.setDate(raw.date);
                }

                await this.transport.exec(log);
            } catch (e) {
                // can log here
            }
        }
        await this.transport.close();
    }
}

export namespace Default {
    export interface Raw {
        logLevel: string;
        jsonData: Record<string, any>;
    }

    export interface Reader {
        createDecryptedReader(path: string): AsyncIterable<any>;
    }

    export interface Log {
        getLevel(): string;
        setDate(date: Date): Log;
    }

    export interface LogFactory<T extends Log> {
        createLog(logLevel: Raw['logLevel'], jsonData: Raw['jsonData']): T;
    }

    export interface Transport<T extends Log> {
        exec(log: T): Promise<void>;
        close(): Promise<void>;
    }
}
