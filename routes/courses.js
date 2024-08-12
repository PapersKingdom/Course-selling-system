const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { saveCourse, getCourses, deleteCourse } = require('../utils/fileHandler');

router.get('/', (req, res) => {
    const courses = getCourses();
    res.render('courses', { courses });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', auth, (req, res) => {
    const { title, description, imageUrl, videoLink } = req.body;
    saveCourse({ title, description, imageUrl, videoLink });
    res.redirect('/courses');
});

router.post('/delete/:title', auth, (req, res) => {
    const { title } = req.params;
    deleteCourse(title);
    res.redirect('/courses');
});

module.exports = router;