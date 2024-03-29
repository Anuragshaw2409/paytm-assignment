const mongoose  = require('mongoose');
const URI = 'mongodb+srv://vikramBaby:HelloBaby@cluster-vikram.lqeaxt0.mongodb.net/';

function connectToMongo(){
    mongoose.connect(URI).then(()=>console.log("Connected to Mongo")) .catch((err)=>console.log("Error conecting to mongo",err));
}

module.exports = connectToMongo;
