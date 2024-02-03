import fs from "fs";
import path from "path";
import zlib from "zlib";
import stream from "stream"

const compress = async (dirname, from, to) => {
    const pathToCompress = path.resolve(dirname, from);
    const pathToZlib = path.resolve(dirname, to, "archive.gz");

    const streamRead = fs.createReadStream(pathToCompress);
    const transform = zlib.createBrotliCompress();
    const streamWrite = fs.createWriteStream(pathToZlib);

    stream.pipeline( streamRead, transform, streamWrite, err => {if (err) console.error("Operation failed");});
};

const decompress = async (dirname, from, to) => {
    const pathToZlib = path.resolve(dirname, from, "archive.gz");
    const pathToDecompress = path.resolve(dirname, to, "file.txt");

    const streamRead = fs.createReadStream(pathToZlib);
    const transform = zlib.createBrotliDecompress();
    const streamWrite = fs.createWriteStream(pathToDecompress);

    stream.pipeline( streamRead, transform, streamWrite, err => {if (err) console.error("Operation failed");});
};

export {
    compress,
    decompress
}