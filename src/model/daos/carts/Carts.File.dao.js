const FileContainer = require("../../containers/File.container");

class FileCartsDao extends FileContainer {
    constructor(){
        super('./src/data/carts.json');
    }
}

module.exports = FileCartsDao;