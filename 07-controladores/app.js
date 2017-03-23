var catalog = require('./routes/catalog');  //Import routes for "catalog" area of site
app.use('/catalog', catalog);  // Add catalog routes to middleware chain.