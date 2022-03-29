const MariaDBContainer = require("../../containers/MariaDBContainer");

class MariaDBProductsDao extends MariaDBContainer {
    constructor(){
        super('products');
    }
}

module.exports = MariaDBProductsDao;