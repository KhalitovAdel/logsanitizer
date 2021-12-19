import { promises } from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';

import { JsonTransport } from '../../src/transport';
import { AbstractTransport } from '../../src/transport/abstract.transport';
import { JsonUtils } from '../../src/utils/json.utils';

export class TestLog implements AbstractTransport.LogType {
    private date = new Date();

    public getDate(): Date {
        return this.date;
    }

    public getLevel(): string {
        return 'level';
    }

    public toJSON(): Record<string, unknown> {
        return { kek: '123' };
    }
}

describe('DecryptedReader', () => {
    const tmp = tmpdir();
    const projectFolder = 'json-transport';
    const fileFolderPath = path.join(tmp, projectFolder);
    const filePath = path.join(fileFolderPath, 'kek.json');
    let instance: JsonTransport;

    beforeEach(async () => {
        await promises.mkdir(fileFolderPath, { recursive: true });
        instance = new JsonTransport(filePath);
    });

    afterEach(async () => {
        await promises.rmdir(fileFolderPath, { recursive: true });
    });

    it('should exec works', async () => {
        const log = new TestLog();
        await instance.exec(log);
        await instance.exec(log);
        await instance.close();
        const data = await promises.readFile(filePath, { encoding: 'utf-8' });
        expect(JsonUtils.isValid(data)).toBeTruthy();
        const parsedData = JSON.parse(data);
        expect(parsedData.length).toEqual(2);
        const firstLog = parsedData[0];
        const secondLog = parsedData[1];
        expect(firstLog).toMatchObject(secondLog);
        expect(firstLog).toMatchObject({
            timestamp: log.getDate().getTime(),
            loglevel: log.getLevel(),
            ...log.toJSON(),
        });
    });
});
