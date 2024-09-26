const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const serviceRoute = require('./routes/service');
const adminRoute = require('./routes/admin');
const appointmentRoute = require('./routes/appointment');
const profileRoute = require('./routes/profile');
const bodyParser = require('body-parser');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const path = require('path');

dotenv.config({ path: './config/config.env' });

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;

// Setup all routes
app.use('/', authRoute);
app.use('/', appointmentRoute);
app.use('/', profileRoute);
app.use('/', serviceRoute);
app.use('/', adminRoute);
app.use('/', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve React app for any route not handled by the API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT || 5000, () =>
  console.log(`Server has started on port:${PORT}`)
);
