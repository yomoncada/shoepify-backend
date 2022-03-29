const FileContainer = require("../../containers/FileContainer");

class FileCartsDao extends FileContainer {
    constructor(){
        super('./src/data/carts.json');
    }
}

module.exports = FileCartsDao;