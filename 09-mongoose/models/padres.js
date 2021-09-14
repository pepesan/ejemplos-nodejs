var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const childSchema = new Schema({ name: 'string' });

const parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  child: childSchema
});

Padre = mongoose.model('padres', parentSchema);

module.exports = Padre;
