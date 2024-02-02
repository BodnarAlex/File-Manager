import { getGreeting, getfarewall } from "./modules/greeting/index.js";
import { showTable } from "./modules/ls/show.js";

import readline from "readline/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let rl = readline.createInterface(process.stdin, process.stdout);

const start = async () => {
    let greeting = await getGreeting();
    let farewall = await getfarewall();

    console.log(greeting);

    rl.on('line', (text) => {
        if (text === '.exit'){
            rl.close();
        } else {
            process.stdout.write(`You are currently in ${__dirname}\n`);
            switch(text){
                case "ls":
                    showTable();
                    break;
                case "rest":
                    console.log("success rest");
                    break;
                default:
                    console.log("Invalid input");
                    break
            }
        }




    });

    rl.on('close', () => {
        console.log(farewall);
    });

};

await start();
