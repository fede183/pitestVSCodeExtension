class DirectoryManagement {
    constructor(dir) {
        if(dir instanceof DirectoryManagement){
            this.dir = dir.getDir();
        }
        else {
            this.dir = dir;
        }
    }

    getDir() {
        return this.dir;
    }

    addDir(fileOrDirectory) {
        return this.dir + "/" + fileOrDirectory;
    }
}

module.exports = {
    DirectoryManagement,
}