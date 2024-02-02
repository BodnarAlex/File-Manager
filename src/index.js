import  {getGreeting, getfarewall}  from "./modules/greeting/index.js";
import readline from "readline/promises";
let rl = readline.createInterface( process.stdin, process.stdout);

const start = async () => {
   let greeting = await getGreeting();
   let farewall = await getfarewall();

   console.log(greeting);

   rl.on('line', (text) => {
       if (text === '.exit')
           rl.close();
   });

   rl.on('close', () => {
       console.log(farewall);
   });

};

await start();
