// import express from "express"
// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import cors from "cors";
// import cookieParser from "cookie-parser";



// dotenv.config()

// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log("Connected to momgoDB")
// }).catch((err)=>{
//     console.log(err)
// })
// const app = express()

// // import routes
// import authRouter from "./routes/auth.route.js"
// app.use("/api/auth", authRouter)

// // to make input as json
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({origin: "*"}))


// app.listen(3000, ()=>{
//     console.log("Server is running on port 3000")
// })



// // error handling

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500
//     const message = err.message || "Internal Server Error"

//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     })
// })

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Import routes
app.use("/api/auth/", authRouter);
app.use("/api/note/", noteRouter);


// Default route handler
app.get("/", (req, res) => {
  res.send("Welcome to the Note App API!");
});

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
