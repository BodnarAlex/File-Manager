import fs from "fs/promises";

const showTable = async (dirname) => {
    try {
        let resCatalog = [];
        let resFiles = [];
        const files = await fs.readdir(dirname, { withFileTypes: true});
        files.forEach(file => {
            if (file.isFile())
                resFiles.push(file.name);
            else if (file.isDirectory())
                resCatalog.push(file.name);
        });
        resFiles = resFiles.sort().map((x) => x = { "Name": x, "Type": "file" });
        resCatalog = resCatalog.sort().map((x) => x = { "Name": x, "Type": "directory" });;
        console.table([...resCatalog, ...resFiles]);
    } catch {
        console.error("Operation failed");
    }
};

export {
    showTable
};