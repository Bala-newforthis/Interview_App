require("dotenv").config();
const app = require("../BackEnd/src/app.js");
const connectToDB = require("../BackEnd/src/config/database.js")


connectToDB();

app.listen(3000,  () => {
    console.log("Server is running on port 3000");
})