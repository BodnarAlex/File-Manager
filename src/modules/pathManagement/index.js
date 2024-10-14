import help from "../startManagement/index.js"

const changeDir = async (path) => {
    if (await help.checkArg(path.length, 1)) {
        try {
            process.chdir(path[0]);
        } catch (err) {
            console.error("Invalid input");
        }
    }
};

export {
    changeDir
}