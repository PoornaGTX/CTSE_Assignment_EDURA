import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

//error handler
import "express-async-errors";

import morgan from "morgan";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.use("/api/auth", authRoutes);

app.use("/api/v1/students", studentRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listing on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
