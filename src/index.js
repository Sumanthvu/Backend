//Approach 1
//Using try-catch async await ifi
/*

//require('dotenv').config({path: './env'})

import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

import express from 'express'
const  app=express()

( async () => {
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",()=>{
        console.log("Error: ",error);
        throw error;
      })
      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
      })
    }
    catch(error){
        console.error("Error: ",error);
        throw error
    }
} ) ()

*/

//Approach 2

//We will connect the database in a different file inside the DB folder
//export that and import in the index file

// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

import connectDB from "./db/index.js";
import express from "express";
const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed ", error);
  });
