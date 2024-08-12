const fs = require('fs');
const path = require('path');

const coursesDir = path.join(__dirname, '..', 'data', 'courses');

function saveCourse(courseData) {
    const courseDir = path.join(coursesDir, courseData.title.replace(/\s+/g, '_'));
    fs.mkdirSync(courseDir, { recursive: true });

    const courseInfo = {
        title: courseData.title,
        description: courseData.description,
        imageUrl: courseData.imageUrl,
        videoLink: courseData.videoLink,
        createdAt: new Date().toISOString()
    };

    fs.writeFileSync(path.join(courseDir, 'info.json'), JSON.stringify(courseInfo, null, 2));
}

function getCourses() {
    const courses = [];
    const courseFolders = fs.readdirSync(coursesDir);

    for (const folder of courseFolders) {
        const infoPath = path.join(coursesDir, folder, 'info.json');
        if (fs.existsSync(infoPath)) {
            const courseInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
            courses.push(courseInfo);
        }
    }

    return courses;
}

function deleteCourse(title) {
    const courseDir = path.join(coursesDir, title.replace(/\s+/g, '_'));
    if (fs.existsSync(courseDir)) {
        fs.rmdirSync(courseDir, { recursive: true });
    }
}

module.exports = { saveCourse, getCourses, deleteCourse };