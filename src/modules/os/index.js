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
const getusername = async () => {
    try {
        let name = os.userInfo().username;
        console.log(name);
    } catch {
        throw new Error("Operation failed");
    }
};

export {
    getEol,
    gethomedir,
    getusername
};