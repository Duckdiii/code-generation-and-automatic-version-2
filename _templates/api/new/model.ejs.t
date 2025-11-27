---
to: src/models/<%= name %>.js
---
const human = require('./human');

class <%= name %> extends human {
    constructor(data) {
        super(); // Gọi constructor của cha (tạo id, createdAt)
<% 
    if (locals.fields) {
        fields.split(',').forEach(field => {
            const [key, type] = field.split(':');
%>
        this._<%= key %> = data.<%= key %>; 
<% 
        });
    } 
%>
    }

<% 
    if (locals.fields) {
        fields.split(',').forEach(field => {
            const [key, type] = field.split(':');
            const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
%>
    get <%= key %>() {
        return this._<%= key %>;
    }

    set <%= key %>(value) {
        console.log(`Setting <%= key %> to ${value}`);
        this._<%= key %> = value;
    }
<% 
        });
    } 
%>

    getDescription() {
        return `<%= name %> Details [ID: ${this.id}]`;
    }
}

module.exports = <%= name %>;