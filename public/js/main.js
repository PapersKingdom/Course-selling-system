let courseToDelete = '';

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function deleteCourse(title) {
    courseToDelete = title;
    const modal = new bootstrap.Modal(document.getElementById('deleteCourseModal'));
    modal.show();
}

function confirmDelete() {
    const password = document.getElementById('deletePassword').value;
    if (password === 'sithija') {
        showLoading();
        fetch(`/courses/delete/${encodeURIComponent(courseToDelete)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to delete course. Please try again.');
                    hideLoading();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                hideLoading();
            });
    } else {
        alert('Incorrect password. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('courseContainer');
    if (courseContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.col-md-4').forEach(card => {
            observer.observe(card);
        });
    }
});



//Blocking View PAGE SOURCE

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) {
        e.preventDefault();
    }
});