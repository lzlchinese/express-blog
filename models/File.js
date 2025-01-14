var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
//创建model，这个地方的login_user对应mongodb数据库中login_users的conllection
var File = mongoose.model('file111',UserSchema);
module.exports = File;