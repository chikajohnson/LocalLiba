const mongoose = require("mongoose");
const moment = require("moment");
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
    return (this.date_of_death.getFullYear() - this.date_of_birth.getFullYear()).toString();
});

//virtual for author url
AuthorSchema
.virtual('url')
.get(function(){
    return '/catalog/author/'+ this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

//export Author model
module.exports = mongoose.model('Author', AuthorSchema);