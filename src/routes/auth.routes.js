// api creation in this file for my references

const { Router } = require("express");  // const express = require("express")
const authController = require ("../controller/auth.controller");

const authRouter = Router();  // const authRouter = express.Router();


/**
 * @routes POST /api/auth/register
 * @description Register a new user 
 * @access Public
 */

authRouter.post ("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description  Login a user with email and password
 * @access Public
 */

authRouter.post("/login",authController.loginUserController);

module.exports = authRouter;