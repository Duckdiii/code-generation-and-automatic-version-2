---
to: src/controllers/<%= name %>Controller.js
force: true
---
const <%= name %>Service = require('../services/<%= name %>Service');

module.exports = {
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
        const newItem = await <%= name %>Service.create(data);

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
    index: async (req, res) => {
        try {
        const list = await <%= name %>Service.getAll();
        res.json({ success: true, data: list });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}
};