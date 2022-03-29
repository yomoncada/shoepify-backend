const { DB_CONFIG: dbconfig } = require('../../../config');
const knex = require('knex')(dbconfig.mariadb);

class MariaDB {
    constructor(table) {
        this.table = table;
    }

    async get(id) {
        try {
            const data = await knex.from(this.table)
            .select('*')
            .where('id', '=', id)

            return data[0] ? data[0] : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const data = await knex.from(this.table)
            .select('*')

            return data ? data : [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async create(data) {
        try {  
            return await knex(this.table).insert({ ...data });
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            return await knex(this.table).where({ id: id }).update({ ...data });
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await knex(this.table).where({ id: id }).del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            return await knex(this.table).del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = MariaDB;