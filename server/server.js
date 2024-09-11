const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const authRoute = require('./routes/auth');
const serviceRoute = require('./routes/service')
const appointmentRoute = require('./routes/appointment');
const profileRoute = require('./routes/profile');
// const updateExpiredAppointments = require('./expApp');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({ path:'./config/config.env' })

const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // if req.body is undifined need to add this middleware!
app.use(express.json());  // if req.body is empty need to add this middleware!
const PORT = process.env.PORT
// setInterval(updateExpiredAppointments, 60000);
app.use('/', authRoute);
app.use('/', appointmentRoute);
app.use('/', profileRoute);
app.use('/', serviceRoute);

app.listen( PORT || 5000, () =>
  console.log(`Server has started on port:${PORT}`)
);