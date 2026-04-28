const express = require('express');

const app = express();

app.use(express.json());  // basic middleware hai

/*require all the routes here*/ 
const authRouter = require ("./routes/auth.routes")


/*  using all the routes here */ //prefix
app.use("/api/auth", authRouter)



module.exports = app;