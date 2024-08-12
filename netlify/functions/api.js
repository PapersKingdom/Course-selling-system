const express = require('express');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http');
const courseRoutes = require('../../routes/courses');
const indexRoutes = require('../../routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data', 'courses');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Routes
app.use('/.netlify/functions/api', indexRoutes);
app.use('/.netlify/functions/api/courses', courseRoutes);

module.exports.handler = serverless(app);