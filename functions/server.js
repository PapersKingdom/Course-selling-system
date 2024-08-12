const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const fs = require('fs');
const courseRoutes = require('../routes/courses');
const indexRoutes = require('../routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set views directory
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data/courses');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Routes
app.use('/.netlify/functions/server/', indexRoutes);
app.use('/.netlify/functions/server/courses', courseRoutes);

module.exports.handler = serverless(app);