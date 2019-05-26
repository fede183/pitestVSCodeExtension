export default class DirectoryManagement {
    constructor(dir) {
        this.dir = dir;
    }

    get getDir() {
        return this.dir;
    }

    set addDir(fileOrDirectory) {
        this.dir += "/" + fileOrDirectory;
    }
}