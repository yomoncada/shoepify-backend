const SQLiteContainer = require("../../containers/SQLiteContainer");

class SQLiteCartsDao extends SQLiteContainer {
    constructor(){
        super('carts');
    }
}

module.exports = SQLiteCartsDao;