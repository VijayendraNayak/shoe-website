import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to mongodb")
}).catch((err) => {
  console.log(err)
});
const app = express();
app.listen(3000, () => {
  console.log("server listening at port 3000")
})
app.use(express.json())
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
