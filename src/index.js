import  {getUserName, getGreeting, getfarewall}  from "./modules/greeting/index.js";
import readline from "readline";

const start = async () => {
   let userName = await getUserName();
   let greeting = await getGreeting();
   let farewall = await getfarewall();


   console.log(userName);
   console.log(greeting);
   console.log(farewall);
};

await start();
