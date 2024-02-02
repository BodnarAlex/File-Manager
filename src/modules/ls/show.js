import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToCatalog = path.join(__dirname, "..", "..", "files");

console.log(pathToCatalog);
const showTable = async () => {
    try {
        let res =[];
        const files = await fs.readdir(pathToCatalog);
        console.log(files);
        files.forEach(file => {
            res.push({"Name": file, "Type": "file"});
        });
        console.log(res);
        console.table(res);
    } catch {
        throw new Error("Operation failed");
    }
};
await showTable();

export {
    showTable
};