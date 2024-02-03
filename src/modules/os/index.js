import os from "os";

const getEol = async () => {
    try {
        let eol = JSON.stringify(os.EOL);
        console.log(eol);
    } catch {
        console.error("Operation failed");
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
        console.error("Operation failed");
    }
};
const gethomedir = async () => {
    try {
        let homedir = os.homedir();
        console.log(homedir);
    } catch {
        console.error("Operation failed");
    }
};
const getusername = async () => {
    try {
        let name = os.userInfo().username;
        console.log(name);
    } catch {
        console.error("Operation failed");
    }
};
const getArchitecture = async () => {
    try {
        let arch = os.arch()
        console.log(arch);
    } catch {
        console.error("Operation failed");
    }
};

export {
    getEol,
    getCpus,
    gethomedir,
    getusername,
    getArchitecture
};