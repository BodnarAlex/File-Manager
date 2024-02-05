import path from "path";
import { createHash } from "crypto";
import fsPromise from "fs/promises";
import help from "../startManagement/index.js"

const calculateHash = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {

        try {
            const pathRead = path.resolve(dirname, filename[0]);
            const stats = await fsPromise.stat(pathRead);
            if (stats.isFile()) {
                const stream = await fsPromise.readFile(pathRead);
                const hash = createHash("sha256");
                const resultString = hash.update(stream).digest('hex');
                console.log(resultString);
            }
        } catch (error) {
            console.error("Operation failed");
        }
    }
};

export {
    calculateHash
}