const getUserName = async () => {
    let userName = "";
    const args = process.argv;
    for (let i = 0; i < args.length; i++)
        if (args[i].startsWith("--") && args[i].includes("="))
            userName = args[i].split("=")[1];

    return(userName);
};

const getGreeting = async () => {
    let userName = await getUserName();
    let startPhrase = `Welcome to the File Manager, ${userName}!\n`;
    console.log(startPhrase);
};

const getfarewall = async () => {
    let userName = await getUserName();
    let endPrase = `Thank you for using File Manager, ${userName}, goodbye!\n`;
    console.log(endPrase);
};

const getCwdPath = async (path) => {
    console.log("You are currently in " + path);
};

export default {
    getUserName,
    getGreeting,
    getfarewall,
    getCwdPath,
};