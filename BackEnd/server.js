require("dotenv").config();
const app = require("../BackEnd/src/app.js");
const connectToDB = require("../BackEnd/src/config/database.js");
const {resume , selfDescription, jobDescription } = require("./src/services/temp.js")
const { generateInterviewReport } = require("./src/services/ai.service.js")

connectToDB();

generateInterviewReport({ resume, selfDescription, jobDescription })


app.listen(3000,  () => {
    console.log("Server is running on port 3000");
});