import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import help from "../startManagement/index.js"

const addFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        const PathTo = path.join(dirname, filename[0]);
        await fsPromise.writeFile(PathTo, "", { flag: "wx" }, (err) => {
            if (err) console.error("Operation failed");
        });
    }
};

const readFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        const pathToRead = path.join(dirname, filename[0]);
        try {
            const content = fs.createReadStream(pathToRead, { encoding: 'utf-8' });
            await pipeline(content, process.stdout, { end: false });

            content.on('error', (err) => {
                console.error("Operation failed");
            });
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const renameFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        const pathOld = path.resolve(dirname, files[0]);
        const pathNew = path.resolve(dirname, files[1]);
        try {
            await fsPromise.rename(pathOld, pathNew);
        } catch {
            console.log('Operation failed')
        }
    }
};

const copyFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        const pathFrom = path.resolve(dirname, files[0]);
        const pathTo = path.resolve(dirname, files[1], files[0]);

        try {
            const copyFrom = fs.createReadStream(pathFrom, "utf-8");
            const copyTo = fs.createWriteStream(pathTo, "utf-8");
            await pipeline(copyFrom, copyTo);
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const removeFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        try {
            const pathToDelete = path.join(dirname, filename[0]);
            await fsPromise.unlink(pathToDelete);
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const moveFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        try {
            await copyFile(dirname, files);
            await removeFile(dirname, files.slice(0, 1));
        } catch {
            console.error("Operation failed");
        }
    }
};

export default {
    addFile,
    readFile,
    renameFile,
    copyFile,
    removeFile,
    moveFile
}