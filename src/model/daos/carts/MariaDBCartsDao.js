const MariaDBContainer = require("../../containers/MariaDBContainer");

class MariaDBCartsDao extends MariaDBContainer {
    constructor(){
        super('carts');
    }
}

module.exports = MariaDBCartsDao;