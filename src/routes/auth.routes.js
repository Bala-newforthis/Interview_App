// api creation in this file for my references

const { Router } = require("express");  // const express = require("express")
const authRouter = require("../controller/auth.controller")

const authRouter = Router();  // const authRouter = express.Router();


/**
 * @routes POST /api/auth/register
 * @description Register a new user 
 * @access Public
 */

authRouter.post ("/register", authController.registerUserController)

module.exports = authRouter;