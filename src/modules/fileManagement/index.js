import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";

const addFile = async (dirname, filename) => {
    const PathTo = path.join(dirname, filename);
    await fsPromise.writeFile(PathTo, "", { flag: "wx" }, (err) => {
        if (err) console.error("Operation failed");
    });
};

const readFile = async (dirname, filename) => {
    const pathToRead = path.join(dirname, filename);
    try {
        const content = fs.createReadStream(pathToRead, { encoding: 'utf-8'});
        await pipeline(content, process.stdout, {end:false});

        content.on('error', (err) => {
            console.error("Operation failed");
        });
    } catch (err) {
        console.error("Operation failed");
    }
};

const renameFile = async (dirname, fileOld, fileNew) => {
    const pathOld = path.resolve(dirname, fileOld);
    const pathNew = path.resolve(dirname, fileNew);
    try {
        await fsPromise.rename(pathOld, pathNew);
    } catch {
        console.log('Operation failed')
    }
};

const copyFile = async (dirname, fileCopy, fileTo) => {
    const pathFrom = path.resolve(dirname, fileCopy);
    const pathTo = path.resolve(dirname, fileTo, fileCopy);

    try {
        const copyFrom = fs.createReadStream(pathFrom, "utf-8");
        const copyTo = fs.createWriteStream(pathTo, "utf-8");
        await pipeline(copyFrom, copyTo);
    } catch (err) {
        console.error("Operation failed");
    }
};

const removeFile = async (dirname, filename) => {
    try {
        const pathToDelete = path.join(dirname, filename);
        await fsPromise.unlink(pathToDelete);
    } catch (err) {
        console.error("Operation failed");
    }
};

const moveFile = async (dirname, fileCopy, fileTo) => {
    try {
        await copyFile(dirname, fileCopy, fileTo);
        await removeFile(dirname, fileCopy);
    } catch {
        console.error("Operation failed");
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