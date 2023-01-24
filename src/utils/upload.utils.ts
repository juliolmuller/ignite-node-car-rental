import fs from 'fs';
import path from 'path';

export async function destroy(relativePath: string = process.env.STORAGE_TEMP_PATH) {
  try {
    const absolutePath = path.resolve(__dirname, '..', '..', relativePath);

    await fs.promises.stat(absolutePath);
    await fs.promises.unlink(absolutePath);
  } catch {
    // no action
  }
}
