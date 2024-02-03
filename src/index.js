import help from "./modules/startManagement/index.js";
import action from "./modules/fileManagement/index.js";
import { chooseAction } from "./modules/os/index.js";
import { showTable } from "./modules/ls/index.js";
import { calculateHash } from "./modules/hash/index.js";
import { compress, decompress } from "./modules/zlib/index.js";
import { changeDir } from "./modules/getPath/index.js";

import readline from "readline/promises";
import process from "process";

let rl = readline.createInterface(process.stdin, process.stdout);

const start = async () => {
    let greeting = await help.getGreeting();
    let farewall = await help.getfarewall();
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
                    changeDir("..");
                    break;
                case "cd":
                    changeDir(option[1]);
                    break;
                case "add":
                    action.addFile(mainPath, option[1]);
                    break;
                case "cat":
                    action.readFile(mainPath, option[1]);
                    break;
                case "rn":
                    action.renameFile(mainPath, option[1], option[2]);
                    break;
                case "rm":
                    action.removeFile(mainPath, option[1]);
                    break;
                case "cp":
                    action.copyFile(mainPath, option[1], option[2]);
                    break;
                case "mv":
                    action.moveFile(mainPath, option[1], option[2]);
                    break;
                case "hash":
                    calculateHash(mainPath, option[1]);
                    break;
                case "compress":
                    compress(mainPath, option[1], option[2]);
                    break;
                case "decompress":
                    decompress(mainPath, option[1], option[2]);
                    break;
                case "os":
                    chooseAction(option[1]);
                    break;
                default:
                    console.error("Invalid input");
                    break;
            }
            console.log("You are currently in " + process.cwd());
        }
    });

    rl.on('close', () => {
        console.log(farewall);
    });
};

await start();
