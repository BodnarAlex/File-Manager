import help from "./modules/startManagement/index.js";
import action from "./modules/fileManagement/index.js";
import { chooseAction } from "./modules/os/index.js";
import { showTable } from "./modules/ls/index.js";
import { calculateHash } from "./modules/hash/index.js";
import { compress, decompress } from "./modules/zlib/index.js";
import { changeDir } from "./modules/pathManagement/index.js";

import readline from "readline/promises";
import process from "process";

let rl = readline.createInterface(process.stdin, process.stdout);

const start = async () => {
    await help.getGreeting();
    await help.getCwdPath(process.cwd());

    rl.on('line', (text) => {
        if (text === '.exit') {
            rl.close();
        } else {
            let command = "";
            let option = [];
            if (text.includes(" ")) {
                command = text.split(" ")[0];
                let regexp = /(?<=["'])[^"']+/gm;
                option = text.match(regexp);
                console.log("try", option)
                if (!option) {
                    option = text.split(" ").slice(1);
                } else {
                    option = option.filter((x, index) => index % 2 === 0);
                }
            } else {
                command = text;
            }

            let mainPath = process.cwd();
            console.log("command = ", command);
            console.log("option = ", option);

            switch (command) {
                case "ls":
                    console.log("ls")
                    showTable(mainPath);
                    break;
                case "up":
                    changeDir("..");
                    break;
                case "cd":
                    changeDir(option[0]);
                    break;
                case "add":
                    action.addFile(mainPath, option[0]);
                    break;
                case "cat":
                    action.readFile(mainPath, option[0]);
                    break;
                case "rn":
                    action.renameFile(mainPath, option[0], option[1]);
                    break;
                case "rm":
                    action.removeFile(mainPath, option[0]);
                    break;
                case "cp":
                    action.copyFile(mainPath, option[0], option[1]);
                    break;
                case "mv":
                    action.moveFile(mainPath, option[0], option[1]);
                    break;
                case "hash":
                    calculateHash(mainPath, option[0]);
                    break;
                case "compress":
                    compress(mainPath, option[0], option[1]);
                    break;
                case "decompress":
                    decompress(mainPath, option[0], option[1]);
                    break;
                case "os":
                    chooseAction(option[0]);
                    break;
                default:
                    console.error("Invalid input");
                    break;
            }
            help.getCwdPath(process.cwd());
        }
    });

    rl.on('close', () => {
        help.getfarewall();
    });
};

await start();