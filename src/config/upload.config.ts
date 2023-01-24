import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

function escapeFileName(filename: string) {
  const disallowedChars = /[~"#%&*:<>?\\/|{}]/g;
  const escapedFileName = filename.replace(disallowedChars, '');
  return escapedFileName;
}

export function hash(relativePath: string = process.env.STORAGE_TEMP_PATH) {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', relativePath),
    }),
  };
}

export function prefixed(relativePath: string = process.env.STORAGE_TEMP_PATH) {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', relativePath),
      filename(request, file, callback) {
        const hashPrefix = crypto.randomBytes(16).toString('hex');
        const escapedFileName = escapeFileName(file.originalname);
        const finalFileName = `${hashPrefix}-${escapedFileName}`;

        callback(null, finalFileName);
      },
    }),
  };
}
