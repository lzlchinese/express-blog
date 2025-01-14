var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var userSchema = new Schema({
    name:{ type: String },
    sex:{ type: String },
    identity:{ type: String }, 
    password:{ type: String },
    comment:{ type: String },
    date:{ type: String },
    startdate:{ type: String },
    enddate:{ type: String },
    phone:{ type: String },
    age:{ type: String },
    email:{ type: String },
    fieldname:{ type: String },
    encoding:{ type: String },
    originalname:{ type: String },
    mimetype:{ type: String },
    destination:{ type: String },
    filename:{ type: String },
    path:{ type: String },
    size:{ type: String },
    username:{ type: String },
    encodefilename: { type: String },
    title:{ type: String },
    menu: { type: String },
    blog: { type: String },
    action: { type: String }
});
module.exports = userSchema;