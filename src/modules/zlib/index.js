import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import zlib from "zlib";
import stream from "stream";
import help from "../startManagement/index.js";

const compress = async (dirname, args) => {
    if (await help.checkArg(args.length, 2)) {
        const pathToCompress = path.resolve(dirname, args[0]);
        const nameFile = path.basename(args[0]) + ".br";
        const pathToZlib = path.resolve(dirname, args[1], nameFile);
        try {
            const stats = await fsPromise.stat(pathToCompress);
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
    }
};

const decompress = async (dirname, args) => {
    if (await help.checkArg(args.length, 2)) {
        const pathToZlib = path.resolve(dirname, args[0]);
        const nameFile = path.basename(args[0], ".br");
        const pathToDecompress = path.resolve(dirname, args[1], nameFile);

        try {
            const stats = await fsPromise.stat(pathToZlib);
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
    }
};

export {
    compress,
    decompress
}