const mongoose= require("mongoose");
require("dotenv").config();

async function connectToDB() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to DataBase");
    }
    catch (err){ 
        console.log(process.env.MONGO_URI);
        
    console.log("Err");
    }
}

module.exports = connectToDB