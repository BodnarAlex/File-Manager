import os from "os";

const getEol = async (dirname) => {
    try {
        let eol = JSON.stringify(os.EOL);
        console.log(eol);
    } catch {
        throw new Error("Operation failed");
    }
};

export {
    getEol
};