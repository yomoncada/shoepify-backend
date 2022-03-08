const fs = require('fs');

class Cart {
    constructor(path = null) {
        this.path = path;
    }

    async add() {
        try {  
            let cart = {
                id: 1,
                timestamp: Date.now(),
                productos: []
            };

            let contents = await this.getAll();

            if (contents.length > 0) {
                cart.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return cart;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async addProduct(id, product) {
        try {  
            let contents = await this.getAll();

            const index = contents.findIndex((cart) => cart.id === +id);

            const products = contents[index].productos;

            products.push(product);

            contents[index] = {
                ...contents[index],
                productos: products
            };

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents[index];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async get(id) {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(contents);
            const cart = carts.find(cart => cart.id == id);

            return cart ? cart.productos : null;
        } catch (error) {
            return [];
        }
    }

    async getAll() {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');

            return JSON.parse(contents);
        } catch (error) {
            return [];
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const contents = await this.getAll();

            const cartIndex = contents.findIndex((cart) => cart.id === +cartId);

            const products = contents[cartIndex].productos;

            const productIndex = products.findIndex((product) => product.id === +productId);

            console.log(productIndex);

            if(productIndex > -1) {
                products.splice(productIndex, 1);
            }

            contents[cartIndex] = {
                ...contents[cartIndex],
                productos: products
            };

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents[cartIndex];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = Cart; 