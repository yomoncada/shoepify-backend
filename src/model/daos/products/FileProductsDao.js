const FileContainer = require("../../containers/FileContainer");

class FileProductsDao extends FileContainer {
    constructor(){
        super('./src/data/products.json');
    }
}

module.exports = FileProductsDao;