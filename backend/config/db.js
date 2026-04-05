const { response } = require('express');
const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const response = await mongoose.connect(process.env.MONGODB);
        console.log(response.connection.db.databaseName)
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;