const fs = require('fs');

class Product {
    constructor(path = null) {
        this.path = path;
    }

    async add({nombre, descripcion, codigo, foto, precio, stock}) {
        try {  
            let product = {
                id: 1,
                timestamp: Date.now(),
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            };

            let contents = await this.getAll();

            if (contents.length > 0) {
                product.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return product;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async get(id) {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(contents);
            const product = products.find(product => product.id == id);

            return product ? product : null;
        } catch (error) {
            return [];
        }
    }

    async getAll() {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            console.log(JSON.parse(contents));

            return JSON.parse(contents);
        } catch (error) {
            return [];
        }
    }

    async edit({ id, nombre, descripcion, codigo, foto, precio, stock }) {
        try {  
            const contents = await this.getAll();
            
            const index = contents.findIndex((product) => product.id === +id);

            const product = {
                ...contents[index],
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            };

            contents[index] = product;

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents[index];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const contents = await this.getAll();

            const index = contents.findIndex((product) => product.id === +id);

            contents.splice(index, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = Product; 