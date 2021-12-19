import { constants, promises } from 'fs';

import { LogFactory } from '../log';
import { AbstractLog } from '../log/abstract.log';
import { ReaderDecryption } from '../reader-decryption';
import { JsonTransport } from '../transport';
import { Default } from './default';

export async function parse(
    inputPath: string,
    outputPath: string
): Promise<void> {
    if (
        !(await promises.access(inputPath, constants.F_OK).then(
            () => true,
            () => false
        ))
    )
        throw new Error(`File not exists ${inputPath}`);

    const instance = new Default<AbstractLog>(
        ReaderDecryption,
        new JsonTransport(outputPath),
        LogFactory
    );

    await instance.parse(inputPath);
}
