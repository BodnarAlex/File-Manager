import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const showTable = async (__dirname) => {
    try {

        let resCatalog = [];
        let resFiles = [];
        const files = await fs.readdir(__dirname, { withFileTypes: true , recursive: true});
        files.forEach(file => {
            if (file.isFile())
                resFiles.push(file.name);
            else
                resCatalog.push(file.name);
        });
        resFiles = resFiles.sort().map((x)=>x = {"Name": x, "Type": "file"});
        resCatalog = resCatalog.sort().map((x)=>x = {"Name": x, "Type": "directory"});;
        resCatalog.push(...resFiles);
        console.table(resCatalog);
    } catch {
        throw new Error("Operation failed");
    }
};

export {
    showTable
};