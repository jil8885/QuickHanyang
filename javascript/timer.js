window.addEventListener('DOMContentLoaded', function() {
    checkWhenSemesterFinished();
    setInterval(checkWhenSemesterFinished, 1000);
});

function checkWhenSemesterFinished() {
    let today = new Date();
    if ((today.getMonth() === 2 && today.getDate() > 1) || (today.getMonth() > 2 && today.getMonth() < 5) || (today.getMonth() === 5 && today.getDate() < 21)) {
        showTimeUntilEndOfSemester(today, new Date(today.getFullYear(), 5, 21));
    } else if ((today.getMonth() >= 8 && today.getMonth() < 11) || (today.getMonth() === 11 && today.getDate() < 21)) {
        showTimeUntilEndOfSemester(today, new Date(today.getFullYear(), 11, 21));
    } else if (today.getMonth() >= 5 && today.getMonth() < 8) {
        showTimeUntilStartOfSemester(today, new Date(today.getFullYear(), 8, 0));
    } else {
        showTimeUntilStartOfSemester(today, new Date(today.getFullYear(), 2, 1));
    }
}

function showTimeUntilEndOfSemester(today, endOfSemester) {
    let diff = endOfSemester.getTime() - today.getTime();
    let days = Math.ceil(diff / (1000 * 3600 * 24));
    let hours = Math.ceil(diff / (1000 * 3600));
    let minutes = Math.ceil(diff / (1000 * 60));
    let seconds = Math.ceil(diff / 1000);
    let timer = document.getElementById("semester-timer");
    if (days > 1) {
        timer.innerText = `종강까지 ${days}일 ${hours % 24}시간 ${minutes % 60}분 ${seconds % 60}초`;
    }
    else if (hours > 1) {
        timer.innerText = `종강까지 ${hours}시간 ${minutes % 60}분 ${seconds % 60}초`;
    }
    else if (minutes > 1) {
        timer.innerText = `종강까지 ${minutes}분 ${seconds % 60}초`;
    }
}

function showTimeUntilStartOfSemester(today, startOfSemester) {
    let diff = startOfSemester.getTime() - today.getTime();
    let days = Math.ceil(diff / (1000 * 3600 * 24));
    let hours = Math.ceil(diff / (1000 * 3600));
    let minutes = Math.ceil(diff / (1000 * 60));
    let seconds = Math.ceil(diff / 1000);
    let timer = document.getElementById("semester-timer");
    if (days > 1) {
        timer.innerText = `개강까지 ${days}일 ${hours % 24}시간 ${minutes % 60}분 ${seconds % 60}초`;
    }
    else if (hours > 1) {
        timer.innerText = `개강까지 ${hours}시간 ${minutes % 60}분 ${seconds % 60}초`;
    }
    else if (minutes > 1) {
        timer.innerText = `개강까지 ${minutes}분 ${seconds % 60}초`;
    }
}