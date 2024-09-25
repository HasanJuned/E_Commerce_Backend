// Application Configuration
const dotenv = require("dotenv");
dotenv.config();
require("nodemailer");
const express = require("express");
const app = express();
const router = require("./src/routes/api");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');

const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100});

mongoose.plugin(sanitizerPlugin);

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(limiter);
app.use('/', router);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('E com Database Connected'))
    .catch((error) => {
        console.log('Failed to connect with database');
        console.log(error);
        process.exit(1);
    })

module.exports = app;
