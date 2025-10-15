import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//some of the major configurations done in express
//configurations are done using app.use()

//for cors
//it says from which all ports/sites the request should be accepted
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//the below line limits the incoming data in json format to only be a max of 16 bytes
//applies only if the data is in json format
app.use(express.json({ limit: "16kb" }));

//this line indicates express to read and understand the data
//submitted from the form
// extended:true indicates to read the nested data like
//{ user: { name: "Sumanth", age: "21" } }
//limit is user for limiting the maximum size of the incoming data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

//cookie-parser
//it lets the express app to read and understand the cookies coming along with the data or user requests
app.use(cookieParser());

export { app };
