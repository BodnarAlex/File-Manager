const changeDir = async (path) => {
    try {
        process.chdir(path);
    } catch (err) {
        console.error("Invalid input");
    }
};

export {
    changeDir
}