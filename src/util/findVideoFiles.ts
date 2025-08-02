import fs from 'fs';
import path from 'path';
import { VIDEO_EXTENSIONS } from './CONSTANTS';

// file copied from dirscan 2025-07-31 thunderstorm tribeca

type file = {
    path: string;
    size: number;
    ext: string;
    timeCreated: string;
    timeModified: string;
}

// const videoExtensions = ["mp4", "avi", "wmv", "mkv", "mov", "m4v", "webm"]
const extensions = new Set(VIDEO_EXTENSIONS);

export function recursivelyAddDirectoryContents(dirPath, fileSet = new Set(), fileList: file[] = []) {
    // Read the directory contents
    const items = fs.readdirSync(dirPath);

    // Iterate through each item in the directory
    for (const item of items) {
        const itemPath = path.join(dirPath, item);

        // Get stats for the item (is it a file or directory?)
        const stats = fs.statSync(itemPath);

        // If it's a directory, recursively add its contents
        if (stats.isDirectory()) {
            recursivelyAddDirectoryContents(itemPath, fileSet, fileList);
        } else if (stats.isFile()) {
            // If it's a file and not a duplicate,
            // and if it's extension is included in video files,
            // add to the list

            const ext = path.extname(itemPath).slice(1).toLowerCase();

            if (!fileSet.has(itemPath) && extensions.has(ext)) {
                fileSet.add(itemPath); // Add to the set to avoid duplicates
                fileList.push({
                    path: itemPath,
                    size: stats.size,
                    ext: ext,
                    timeCreated: String(stats.birthtime),
                    timeModified: String(stats.mtime),
                }); // Add to the final file list
            }
        }
    }

    return fileList;
}
