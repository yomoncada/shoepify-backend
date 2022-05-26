class MemoryContainer {
    constructor(data = []) {
        this.data = data;
    }

    get(id) {
        return this.data.find(object => object.id === +id);
    }

    getAll() {
        const data = [...this.data];

        return data;
    }

    create(data) {
        const object = {
            id: this.data.length + 1,
            ...data
        };

        this.data.push(object);
        
        return object;
    }

    update(id, data) {
        const index = this.data.findIndex((object) => object.id === +id);

        const object = {
            ...this.data[index],
            ...data
        };
    
        this.data[index] = object;

        return this.data[index];
    }

    delete(id) {
        const index = this.data.findIndex(object => object.id === +id);

        this.data.splice(index, 1);
    }

    deleteAll() {
        this.data = [];
    }
}

module.exports = MemoryContainer;