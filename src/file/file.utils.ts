import multer from 'multer';
import { join } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

function getDatePrefix(): string {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yy}${mm}${dd}`;
}

export function getUploadOptions(): MulterOptions {

    const uploadPath = join(process.cwd(), 'upload');

    return {
        storage: multer.diskStorage({
            destination: uploadPath,
            filename: (req, file, cb) => {
                const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
                const newFileName = `${getDatePrefix()}_${originalName}`;
                cb(null, newFileName);
            },
        }),
        limits: {
            fileSize: 100 * 1024 * 1024, // 100MB
            files: 10,   
        },
    };
}
