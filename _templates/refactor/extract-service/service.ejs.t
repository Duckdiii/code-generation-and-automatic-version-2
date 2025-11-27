---
to: src/services/<%= name %>Service.js
---
const db = require('../db');

class <%= name %>Service {

    constructor() {

        this.tableName = '<%= h.inflection.pluralize(name.toLowerCase()) %>';
    }

    async create(data) {
        try {
        console.log(`[Service] Inserting into table: ${this.tableName}`);

        const [result] = await db(this.tableName)
            .insert(data)
            .returning('*');

        return result;
        } catch (error) {
            console.error("[Database Error]", error);
            throw error; // Ném lỗi để Controller bắt
        }
    }

    async getAll() {
        return await db(this.tableName).select('*');
    }
}

module.exports = new <%= name %>Service();