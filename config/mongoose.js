const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

let dbData = {
    selectall: function(name, callback){
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/test';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find().toArray((err, result) => {
                if(err){
                    return;
                }
                callback(result);
            })
        });
    }
}

module.exports = dbData;