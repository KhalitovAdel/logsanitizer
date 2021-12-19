import { constants, promises } from "fs";

import { Default } from "./default";

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
  const parser = new Default();

  await parser.parse(inputPath, outputPath);
}
