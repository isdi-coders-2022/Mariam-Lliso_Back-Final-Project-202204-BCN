const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { errorNotFound, generalServerError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouters/userRouters");

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "https://mariam-lliso-front-final-project-202204-bcn.netlify.app/",
    "https://mariam-lliso-front-final-project-202204-bcn.netlify.app",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/user", userRouter);

app.use(errorNotFound);
app.use(generalServerError);

module.exports = app;
