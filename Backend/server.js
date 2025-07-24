import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/databaseConfig.js";
import userRoute from "./Routes/userRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api",userRoute);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
  connectDB();
});