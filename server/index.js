require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const InitiateMongoServer = require("./config/db");

const authRoute = require("./routes/auth");


InitiateMongoServer();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", function (req, res) {
  res.json({
    endpoints:{
        auth:'/api/auth',
    }
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
