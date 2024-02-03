import os from "os";

const getEol = async () => {
    try {
        let eol = JSON.stringify(os.EOL);
        console.log(eol);
    } catch {
        throw new Error("Operation failed");
    }
};
const getCpus = async () => {
    try {
        let cpus = os.cpus();
        console.log("Overall amount of CPUS", cpus.length);
        let res = [];
        cpus.forEach(item => {
            let rate = Number(item.speed / 1000) + " GHz";
            let model = item.model.trim();
            res.push({"Model": model, "Clock rate": rate});
        })
        console.table(res);
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
    getCpus,
    gethomedir,
    getusername
};