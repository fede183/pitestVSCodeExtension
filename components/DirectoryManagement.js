class DirectoryManagement {
    constructor(dir) {
        this.dir = dir;
    }

    getDir() {
        return this.dir;
    }

    addDir(fileOrDirectory) {
        this.dir += "/" + fileOrDirectory;
    }
}

module.exports = {
    directoryManagement: DirectoryManagement,
}