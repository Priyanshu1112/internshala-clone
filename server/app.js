require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const cors = require("cors");

// db connection
require("./models/database.js").connectDatabase();

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// // Additional CORS headers
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://internshala-clone-frontend.vercel.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

//logger
const logger = require("morgan");
app.use(logger("tiny"));

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

// express file-upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//routes
app.use("/", require("./routes/indexRoutes"));
app.use("/resume/", require("./routes/resumeRoutes"));
app.use("/employee/", require("./routes/employeeRoutes"));

//error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`), 404);
});
app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
