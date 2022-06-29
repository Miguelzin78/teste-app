const express = require("express");
const morgan = require("morgan"); 
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello GeekHunter! 🤓")
})

app.use(function (req, res) {
  console.time("duration")
  next()
})

app.use( '/time', function (req, res) {
  const duration = console.timeEnd("duration") 
  res.send(duration)
})

app.use(express.json());

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

  app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.statusCode = statusCode;
      res.json({
        message: error.message,
        stack: error.stack
      });
    });

    app.use((error, req, res, next) => {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.statusCode = statusCode;
      res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🤓" : error.stack  });
    });

app.use(morgan("common")); 

app.use(
  cors({
    origin: "http://localhost:3000"
  })
)

require("dotenv").config();
console.log(process.env.DB_URL);

const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL, {
useNewUrlParser: true,    
useUnifiedTopology: true  
},  () => console.log("Connected to the database!"))

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
