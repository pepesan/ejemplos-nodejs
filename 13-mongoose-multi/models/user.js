var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema( {
          name: String,
          username: String,
          password: String,
          email: String,
          admin: Boolean
      });
// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
User = mongoose.model('user', userSchema);

module.exports = User;