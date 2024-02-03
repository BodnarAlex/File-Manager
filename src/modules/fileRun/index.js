import fs from "fs/promises";
import path from "path";

const addFile = async (dirname, filename) => {
    filename += '.txt';
    const PathTo = path.join(dirname, filename);
    try {
        await fs.writeFile(PathTo, "", { flag: "wx" });
    } catch {
        throw new Error("Operation failed");
    }
};

const readFile = async (dirname, filename) => {
    filename += '.txt';
    const pathToRead = path.join(dirname, filename);
    try {
        const content = await fs.readFile(pathToRead, "utf8");
        console.log(content);
    } catch {
        throw new Error("FS operation failed");
    }
};

const removeFile = async (dirname, filename) => {
    filename += '.txt';
    const pathToDelete = path.join(dirname, filename);
    try {
        await fs.unlink(pathToDelete);
    } catch {
        throw new Error("FS operation failed");
    }
};

export{
    addFile,
    readFile,
    removeFile
}