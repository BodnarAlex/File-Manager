
const start = () => {
    let userName = "";
    let greeting = "Welcome to the File Manager, ";
    const args = process.argv;
    for (let i = 0; i < args.length; i++)
        if (args[i].startsWith("--") && args[i].includes("="))
            userName = args[i].split("=")[1];
    console.log(greeting + userName + "!");
};

start();