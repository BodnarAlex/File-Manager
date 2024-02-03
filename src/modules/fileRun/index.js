import fs from "fs";
import path from "path";

const addFile = async (dirname, filename) => {
    filename += '.txt';
    const PathTo = path.join(dirname, filename);
    try {
        await fs.writeFile(PathTo, "", { flag: "wx" });
    } catch {
        console.error("Operation failed");
    }
};

const readFile = async (dirname, filename) => {
    filename += '.txt';
    const pathToRead = path.join(dirname, filename);
    try {
        const content = await fs.readFile(pathToRead, "utf8");
        console.log(content);
    } catch {
        console.error("FS operation failed");
    }
};

const renameFile = async (dirname, fileOld, fileNew) => {
    fileOld += '.txt';
    fileNew += '.txt';
    const pathOld = path.resolve(dirname, fileOld);
    const pathNew = path.resolve(dirname, fileNew);
    try {
        await fs.rename(pathOld, pathNew);
    } catch {
        console.error("FS operation failed");
    }
};

const copyFile = async (dirname, fileCopy, fileTo) => {
    fileCopy += '.txt';
    const pathFrom = path.resolve(dirname, fileCopy);
    const pathTo = path.resolve(dirname, fileTo, fileCopy);

    try {
        const copyFrom = fs.createReadStream(pathFrom, "utf-8");
        const copyTo =  fs.createWriteStream(pathTo, "utf-8");
        copyFrom.pipe(copyTo);
    } catch {
        console.error("FS operation failed1");
    }
};

const removeFile = async (dirname, filename) => {
    filename += '.txt';
    const pathToDelete = path.join(dirname, filename);
    try {
        fs.unlink(pathToDelete);
    } catch {
        console.error("FS operation failed2");
    }
};
const moveFile = async (dirname, fileCopy, fileTo) => {
    try {
       copyFile(dirname, fileCopy, fileTo).then(removeFile(dirname, fileCopy));
    } catch {
        console.error("FS operation failed");
    }
};
export {
    addFile,
    readFile,
    renameFile,
    copyFile,
    removeFile,
    moveFile
}