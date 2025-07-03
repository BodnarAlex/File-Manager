import os from "os";
import help from "../startManagement/index.js";

const chooseAction = async (option) => {
    if (await help.checkArg(option.length, 1)) {
        switch (option[0]) {
            case "--EOL":
                showEol();
                break;
            case "--cpus":
                getCpus();
                break;
            case "--homedir":
                showhomedir();
                break;
            case "--username":
                getusername();
                break;
            case "--architecture":
                getArchitecture();
                break;
            default:
                console.error("Invalid input");
                break;
        }
    }
};


const showEol = async () => {
    try {
        let eol = JSON.stringify(os.EOL);
        console.log(eol);
    } catch {
        console.error("Operation failed");
    }
};

const getEol = async () => {
    try {
        let eol = os.EOL;
        return eol;
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
            res.push({ "Model": model, "Clock rate": rate });
        })
        console.table(res);
    } catch {
        console.error("Operation failed");
    }
};

const showhomedir = async () => {
    try {
        let homedir = os.homedir();
        console.log(homedir);
    } catch {
        console.error("Operation failed");
    }
};

const gethomedir = async () => {
    try {
        let homedir = os.homedir();
        return homedir;
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
    chooseAction,
    showEol,
    getEol,
    getCpus,
    showhomedir,
    gethomedir,
    getusername,
    getArchitecture
};