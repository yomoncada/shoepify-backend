const FileContainer = require("../../../model/containers/File.container");

class FileUsersDao extends FileContainer {
    constructor(){
        super('./src/data/users.json');
    }
}

module.exports = FileUsersDao;