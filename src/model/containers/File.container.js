const fs = require('fs');

class FileContainer {
    constructor(path = null) {
        this.path = path;
    }
    
    async get(id) {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(contents);
            const object = data.find(object => object.id == id);

            return object ? object : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
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
    
    async create(data) {
        try {  
            let object = {
                id: 1,
                ...data
            };

            let contents = await this.getAll();

            if (contents.length > 0) {
                object.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(object);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return object.id;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async update(id, data) {
        try {  
            let contents = await this.getAll();

            const index = contents.findIndex((object) => object.id === +id);

            const object = {
                ...contents[index],
                ...data
            };

            contents[index] = object;

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents[index];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const contents = await this.getAll();
            const newData = contents.filter((object) => object.id !== +id);

            await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));

            return newData;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));

            return [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = FileContainer; 