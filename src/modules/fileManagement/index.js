import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import help from "../startManagement/index.js"

const addFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        try {
            const PathTo = path.resolve(dirname, filename[0]);
            await fsPromise.writeFile(PathTo, "", { flag: "wx" }, (err) => {
                if (err) console.error("Operation failed");
            });
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const readFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        const pathToRead = path.resolve(dirname, filename[0]);
        try {
            const stats = await fsPromise.stat(pathToRead);
            if (stats.isFile()) {
                const content = fs.createReadStream(pathToRead, { encoding: 'utf-8' });
                await pipeline(content, process.stdout, { end: false });

                content.on('error', (err) => {
                    console.error("Operation failed");
                });
            }
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const renameFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        const pathOld = path.resolve(dirname, files[0]);
        const filename = path.basename(files[1]);
        if (filename == files[1]) {
            const pathNew = path.resolve(dirname, files[0], "..", filename);
            try {
                const stats = await fsPromise.stat(pathOld);
                if (stats.isFile()) {
                    await fsPromise.rename(pathOld, pathNew);
                }
            } catch {
                console.log('Operation failed')
            }
        } else {
            console.log('Invalid input')
        }
    }
};

const copyFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        const pathFrom = path.resolve(dirname, files[0]);
        const filename = path.basename(files[0]);
        const pathTo = path.resolve(dirname, files[1], filename);

        try {
            const stats = await fsPromise.stat(pathFrom);
            if (stats.isFile()) {
                const copyFrom = fs.createReadStream(pathFrom, "utf-8");
                const copyTo = fs.createWriteStream(pathTo, "utf-8");
                await pipeline(copyFrom, copyTo);
            }
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const removeFile = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {
        try {
            const pathToDelete = path.join(dirname, filename[0]);
            const stats = await fsPromise.stat(pathToDelete);
            if (stats.isFile()) {
                await fsPromise.unlink(pathToDelete);
            }
        } catch (err) {
            console.error("Operation failed");
        }
    }
};

const moveFile = async (dirname, files) => {
    if (await help.checkArg(files.length, 2)) {
        const pathFrom = path.resolve(dirname, files[0]);
        const filename = path.basename(files[0]);
        const pathTo = path.resolve(dirname, files[1], filename);

        try {
            const stats = await fsPromise.stat(pathFrom);
            if (stats.isFile()) {
                const copyFrom = fs.createReadStream(pathFrom, "utf-8");
                const copyTo = fs.createWriteStream(pathTo, "utf-8");
                await pipeline(copyFrom, copyTo);
                await fsPromise.unlink(pathFrom);
            }
        } catch (err) {
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