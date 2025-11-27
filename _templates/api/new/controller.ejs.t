---
to: src/controllers/<%= name %>Controller.js #Phần Frontmatter: Định nghĩa đích đến
force: true
---
const <%= name %> = require('../models/<%= name %>');
const db = require('../../db');
module.exports = {
    // get all
    index: async (req, res) => {
        try {
        const list = await <%= name %>Service.getAll();
        res.json({ success: true, data: list });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
},

    // create new obj
    create: async (req, res) => {
        try {
            const data = req.body;

<% 
    if (locals.fields) {
        fields.split(',').forEach(field => {
            const [key, type] = field.split(':');
%>
            if (!data.<%= key %>) {
                return res.status(400).json({ 
                    success: false,
                    error: "Missing required field: <%= key %>" 
                });
            }
<%
        });
    }
%>

        const tableName = '<%= h.inflection.pluralize(name.toLowerCase()) %>';
            
        console.log(`[Controller] Direct Insert into ${tableName}...`);

        const [newItem] = await db(tableName)
                .insert(data)
                .returning('*');

        res.status(201).json({
            success: true,
            message: "Create <%= name %> successfully",
            data: newItem
        });

        } catch (error) {

        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
},

  // delete
    delete: (req, res) => {
        res.json({ message: "Deleted <%= name %> with ID " + req.params.id });
    }
};