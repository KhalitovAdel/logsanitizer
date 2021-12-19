import { Default } from '../../src/base/default';

class TestLog implements Default.Log {
    getLevel(): string {
        return 'error';
    }

    setDate(): this {
        return this;
    }
}

class JSONTransportMock implements Default.Transport<Default.Log> {
    public close(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public exec(): Promise<void> {
        return Promise.resolve(undefined);
    }
}

class LogFactoryMock implements Default.LogFactory<Default.Log> {
    public createLog(): Default.Log {
        return new TestLog();
    }
}

class Reader implements Default.Reader {
    public createDecryptedReader(): AsyncIterable<any> {
        return new Array(3).fill({
            logLevel: 'error',
            jsonData: {},
            date: new Date(),
        }) as any;
    }
}

/**
 * Very raw test with many any types, sorry but I'm tired.
 */
describe('Default', () => {
    const instance = new Default(
        new Reader(),
        new JSONTransportMock(),
        new LogFactoryMock()
    );

    beforeEach(() => jest.clearAllMocks());

    it('should method parse works like this mock with error log', async () => {
        const reader = jest.spyOn(Reader.prototype, 'createDecryptedReader');
        const logFactory = jest.spyOn(LogFactoryMock.prototype, 'createLog');
        const transportExec = jest.spyOn(JSONTransportMock.prototype, 'exec');
        const transportClose = jest.spyOn(JSONTransportMock.prototype, 'close');
        const logLevel = jest.spyOn(TestLog.prototype, 'getLevel');
        const logSetDate = jest.spyOn(TestLog.prototype, 'setDate');
        await instance.parse('');
        expect(reader).toHaveBeenCalledTimes(1);
        expect(logFactory).toHaveBeenCalledTimes(3);
        expect(logLevel).toHaveBeenCalledTimes(3);
        expect(logSetDate).toHaveBeenCalledTimes(3);
        expect(transportExec).toHaveBeenCalledTimes(3);
        expect(transportClose).toHaveBeenCalledTimes(1);
    });

    it('should method parse works like this mock with non error log', async () => {
        const reader = jest.spyOn(Reader.prototype, 'createDecryptedReader');
        const logFactory = jest.spyOn(LogFactoryMock.prototype, 'createLog');
        const transportExec = jest.spyOn(JSONTransportMock.prototype, 'exec');
        const transportClose = jest.spyOn(JSONTransportMock.prototype, 'close');
        const logLevel = jest.spyOn(TestLog.prototype, 'getLevel');
        logLevel.mockReturnValue(Math.random().toString());
        const logSetDate = jest.spyOn(TestLog.prototype, 'setDate');

        await instance.parse('');
        expect(reader).toHaveBeenCalledTimes(1);
        expect(logFactory).toHaveBeenCalledTimes(3);
        expect(logLevel).toHaveBeenCalledTimes(3);
        expect(logSetDate).toHaveBeenCalledTimes(0);
        expect(transportExec).toHaveBeenCalledTimes(0);
        expect(transportClose).toHaveBeenCalledTimes(1);
    });
});
