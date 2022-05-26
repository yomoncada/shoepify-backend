const FileContainer = require("../../containers/File.container");

class FileOrdersDao extends FileContainer {
    constructor(){
        super('./src/data/orders.json');
    }
}

module.exports = FileOrdersDao;