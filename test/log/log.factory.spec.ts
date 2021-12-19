import { expect } from '@jest/globals';

import { AbstractLog } from '../../src/log/abstract.log';
import { DebugLog } from '../../src/log/debug.log';
import { ErrorLog } from '../../src/log/error.log';
import { InfoLog } from '../../src/log/info.log';
import { LogFactory } from '../../src/log/log.factory';
import { WarnLog } from '../../src/log/warn.log';

describe('LogFactory', () => {
    const instance = new LogFactory();
    const correctPayload = { transactionId: 'tr', details: 'de' };

    it('should isValidPayloadFromRaw get correct type', async () => {
        expect(
            LogFactory['isValidPayloadFromRaw'](correctPayload)
        ).toBeTruthy();
    });

    it('should createLog throw Error if incorrect payload', () => {
        expect(() =>
            instance.createLog(AbstractLog.LogLevels.error, {})
        ).toThrow('Invalid payload');
    });

    it('should createLog throw Error if incorrect level', () => {
        expect(() =>
            instance.createLog(Math.random().toString(), correctPayload)
        ).toThrow('Invalid level');
    });

    it('should return ErrorLog', async () => {
        const log = instance.createLog(AbstractLog.LogLevels.error, {
            ...correctPayload,
            err: 'err',
        });

        expect(log).toBeInstanceOf(ErrorLog);
    });

    it('should return WarnLog', async () => {
        const log = instance.createLog(AbstractLog.LogLevels.warn, {
            ...correctPayload,
            err: 'err',
        });

        expect(log).toBeInstanceOf(WarnLog);
    });

    it('should return DebugLog', async () => {
        const log = instance.createLog(AbstractLog.LogLevels.debug, {
            ...correctPayload,
            userId: 123,
        });

        expect(log).toBeInstanceOf(DebugLog);
    });

    it('should return InfoLog', async () => {
        const log = instance.createLog(
            AbstractLog.LogLevels.info,
            correctPayload
        );

        expect(log).toBeInstanceOf(InfoLog);
    });
});
