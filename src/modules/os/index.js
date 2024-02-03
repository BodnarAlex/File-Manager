import os from "os";

const getEol = async () => {
    try {
        let eol = JSON.stringify(os.EOL);
        console.log(eol);
    } catch {
        throw new Error("Operation failed");
    }
};

const gethomedir = async () => {
    try {
        let homedir = os.homedir();
        console.log(homedir);
    } catch {
        throw new Error("Operation failed");
    }
};

export {
    getEol,
    gethomedir
};