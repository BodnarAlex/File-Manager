import fs from "fs";
import path from "path";
import zlib from "zlib";
import stream from "stream";

const compress = async (dirname, from, to) => {
    const pathToCompress = path.resolve(dirname, from);
    const nameFile = path.basename(from) + ".br";
    const pathToZlib = path.resolve(dirname, to, nameFile);
    try {
        const stats = fs.statSync(pathToCompress);
        if (stats.isFile()) {
            const streamRead = fs.createReadStream(pathToCompress);
            const transform = zlib.createBrotliCompress();
            const streamWrite = fs.createWriteStream(pathToZlib);

            stream.pipeline(streamRead, transform, streamWrite, err => { if (err) console.error("Operation failed"); });
        } else {
            console.error("Invalid input");
        }
    } catch (err) {
        console.error("Operation failed");
    }
};

const decompress = async (dirname, from, to) => {

    const pathToZlib = path.resolve(dirname, from);
    const nameFile = path.basename(from, ".br");
    const pathToDecompress = path.resolve(dirname, to, nameFile);

    try {
        const stats = fs.statSync(pathToZlib);
        if (stats.isFile()) {
            const streamRead = fs.createReadStream(pathToZlib);
            const transform = zlib.createBrotliDecompress();
            const streamWrite = fs.createWriteStream(pathToDecompress);

            stream.pipeline(streamRead, transform, streamWrite, err => { if (err) console.error("Operation failed"); });
        } else {
            console.error("Invalid input");
        }
    } catch (err) {
        console.error("Operation failed");
    }
};

export {
    compress,
    decompress
}