const FileContainer = require("../../containers/File.container");

class FileProductsDao extends FileContainer {
    constructor(){
        super('./src/data/products.json');
    }
}

module.exports = FileProductsDao;