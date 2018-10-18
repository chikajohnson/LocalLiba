const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String,required: true, max:100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

//virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
    return this.family_name + ',' +  this.first_name;
});

//virtual for author's life span
AuthorSchema
.virtual('lifespan')
.get(function(){
    return (this.date_of_death.getYear() - this.date_of_birth.getyear()).toString();
});

//virtual for author url
AuthorSchema
.virtual('url')
.get(function(){
    return '/catlog/author/'+ this._id;
});

//export Author model
module.exports = mongoose.model('Author', AuthorSchema);