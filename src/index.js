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

    rl.on('line', async (text) => {
        if (text === '.exit') {
            rl.close();
        } else {
            let command = await help.getCommand(text);
            let option = await help.getArg(text);
            let mainPath = process.cwd();

            switch (command) {
                case "ls":
                    await showTable(mainPath);
                    break;
                case "up":
                    await changeDir([".."]);
                    break;
                case "cd":
                    await changeDir(option);
                    break;
                case "add":
                    await action.addFile(mainPath, option);
                    break;
                case "cat":
                    await action.readFile(mainPath, option);
                    break;
                case "rn":
                    await action.renameFile(mainPath, option);
                    break;
                case "rm":
                    await action.removeFile(mainPath, option);
                    break;
                case "cp":
                    await action.copyFile(mainPath, option);
                    break;
                case "mv":
                    await action.moveFile(mainPath, option);
                    break;
                case "hash":
                    await calculateHash(mainPath, option);
                    break;
                case "compress":
                    await compress(mainPath, option);
                    break;
                case "decompress":
                    await decompress(mainPath, option);
                    break;
                case "os":
                    await chooseAction(option);
                    break;
                default:
                    console.error("Invalid input");
                    break;
            }
            await help.getCwdPath(process.cwd());
        }
    });

    rl.on('close', () => {
        help.getFarewall();
    });
};

await start();