import { getGreeting, getfarewall } from "./modules/greeting/index.js";
import { addFile, removeFile, renameFile, readFile } from "./modules/fileRun/index.js";
import { showTable } from "./modules/ls/show.js";

import readline from "readline/promises";
import process from "process";

let rl = readline.createInterface(process.stdin, process.stdout);

const start = async () => {
    let greeting = await getGreeting();
    let farewall = await getfarewall();
    console.log(greeting);
    console.log("You are currently in " + process.cwd());

    rl.on('line', (text) => {
        if (text === '.exit') {
            rl.close();
        } else {

            let command = "";
            let option = [""];

            if (text.includes(" ")) {
                command = text.split(" ")[0];
                option = text.split(" ");
            }
            else {
                command = text;
            }
            let mainPath = process.cwd();
            switch (command) {
                case "ls":
                    showTable(mainPath);
                    break;
                case "up":
                    try {
                        process.chdir("..");
                    } catch (err) {
                        console.error("Invalid input");
                    }
                    break;
                case "cd":
                    try {
                        process.chdir(option[1]);
                    } catch (err) {
                        console.error("Invalid input");
                    }
                    break;
                case "add":
                    addFile(mainPath, option[1]);
                    break;
                case "cat":
                    readFile(mainPath, option[1]);
                    break;
                case "rn":
                    renameFile(mainPath, option[1], option[2]);
                    break;
                case "rm":
                    removeFile(mainPath, option[1]);
                    break;
                default:
                    console.log("Invalid input");
                    break;
            }
            console.log(process.cwd());
        }
    });

    rl.on('close', () => {
        console.log(farewall);
    });
};

await start();
