---
inject: true
to: app.js
after: // --- ROUTES HERE ---
skip_if: /<%= name %>Routes/
---
app.use('/api/<%= h.inflection.pluralize(name.toLowerCase()) %>', require('./src/routes/<%= name %>Routes'));