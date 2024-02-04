import path from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import help from "../startManagement/index.js"

const calculateHash = async (dirname, filename) => {
    if (await help.checkArg(filename.length, 1)) {

        const pathRead = path.resolve(dirname, filename[0]);
        const stream = createReadStream(pathRead);
        const hash = createHash("sha256");

        let data = "";
        stream.on("data", (chunk) => (data += chunk));
        stream.on("end", () => {
            const resultString = hash.update(data).digest('hex');
            console.log(resultString);
        });
        stream.on("error", (error) => console.error("Operation failed"));
    }
};

export {
    calculateHash
}