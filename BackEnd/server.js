require("dotenv").config();
const app = require("../BackEnd/src/app.js");
const connectToDB = require("../BackEnd/src/config/database.js");
const invokeGeminiAi= require ("./src/services/ai.service.js")
const generateai = require ("./src/services/ai.service.js")

connectToDB();
invokeGeminiAi();
generateai();

app.listen(3000,  () => {
    console.log("Server is running on port 3000");
})