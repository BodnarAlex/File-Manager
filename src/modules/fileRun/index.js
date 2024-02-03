import fs from "fs";
import path from "path";

const addFile = async (dirname, filename) => {
    const PathTo = path.join(dirname, filename);

    fs.writeFile(PathTo, "", { flag: "wx" }, (err) => {
        if (err) console.error("Operation failed");
    });
};

const readFile = async (dirname, filename) => {
    const pathToRead = path.join(dirname, filename);

    const content = fs.readFile(pathToRead, "utf8", (err) => {
        if (err) console.error("Operation failed");
        console.log(content);
    });
};

const renameFile = async (dirname, fileOld, fileNew) => {
    const pathOld = path.resolve(dirname, fileOld);
    const pathNew = path.resolve(dirname, fileNew);

    fs.rename(pathOld, pathNew, (err) => {
        if (err) console.error("Operation failed");
    });
};

const copyFile = async (dirname, fileCopy, fileTo) => {
    const pathFrom = path.resolve(dirname, fileCopy);
    const pathTo = path.resolve(dirname, fileTo, fileCopy);

    try {
        const copyFrom = fs.createReadStream(pathFrom, "utf-8", (err) => {
            if (err) console.error("Operation failed");
        });
        const copyTo = fs.createWriteStream(pathTo, "utf-8", (err) => {
            if (err) console.error("Operation failed");
        });
        copyFrom.pipe(copyTo);
    } catch {
        console.error("FS operation failed1");
    }
};

const removeFile = async (dirname, filename) => {
    const pathToDelete = path.join(dirname, filename);

    fs.unlink(pathToDelete, (err) => {
        if (err) console.error("Operation failed");
    });
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