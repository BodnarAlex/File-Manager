import { getEol } from "../os/index.js";
const eol = await getEol();

const getUserName = async () => {
    let userName = "";
    const args = process.argv;
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--") && args[i].includes("=")) {
                let regexp = /(?<=["'])[^"']+/gm;
                userName = args[i].match(regexp);
            if(!userName) {
                userName = args[i].split("=")[1];
            }
        }
    }
    if (userName === "" || userName === " ")
        userName = "Username";

    return (userName);
};

const getGreeting = async () => {
    let userName = await getUserName();
    let startPhrase = `Welcome to the File Manager, ${userName}!`;
    console.log(startPhrase);
};

const getFarewall = async () => {
    let userName = await getUserName();
    let endPrase = `Thank you for using File Manager, ${userName}, goodbye!${eol}`;
    console.log(endPrase);
};

const getCwdPath = async (path) => {
    console.log(eol + "You are currently in " + path + eol);
};

const getCommand = async (text) => {
    let command = "";
    if (text.includes(" ")) {
        command = text.split(" ")[0];
    } else {
        command = text;
    }
    return command;
};

const getArg = async (text) => {
    let option = [];
    if (text.includes(" ")) {
        let regexp = /(?<=["'])[^"']+/gm;
        option = text.match(regexp);
        if (!option) {
            option = text.split(" ").slice(1);
        } else {
            option = option.filter((x, index) => index % 2 === 0);
        }
    } else {
        option = []
    }
    return option;
};

const checkArg = async (len, needLen) => {
    if (len != needLen) {
        console.error("Invalid input");
        return false;
    } else {
        return true;
    }
};

export default {
    getGreeting,
    getFarewall,
    getCwdPath,
    getCommand,
    getArg,
    checkArg
};