import { getGreeting, getfarewall } from "./modules/greeting/index.js";
import { addFile, removeFile, renameFile, readFile, copyFile, moveFile } from "./modules/fileRun/index.js";
import { getEol, getCpus, gethomedir, getusername, getArchitecture } from "./modules/os/index.js";
import { showTable } from "./modules/ls/show.js";
import { calculateHash } from "./modules/hash/index.js";
import { compress, decompress } from "./modules/zlib/index.js";

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
                case "cp":
                    copyFile(mainPath, option[1], option[2]);
                    break;
                case "mv":
                    moveFile(mainPath, option[1], option[2]);
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
                    switch (option[1]) {
                        case "--EOL":
                            getEol();
                            break;
                        case "--cpus":
                            getCpus();
                            break;
                        case "--homedir":
                            gethomedir();
                            break;
                        case "--username":
                            getusername();
                            break;
                        case "--architecture":
                            getArchitecture();
                            break;
                        default:
                            console.log("Invalid input");
                            break;
                    }
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
