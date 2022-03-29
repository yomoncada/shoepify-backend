const SQLiteContainer = require("../../containers/SQLiteContainer");

class SQLiteProductsDao extends SQLiteContainer {
    constructor(){
        super('products');
    }
}

module.exports = SQLiteProductsDao;