window.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('theme', function(data) {
        if (data.theme === 'Dark') {
            document.body.style.backgroundColor = '#1e1e1e';
            document.getElementById("settingsButtonImage").style.filter = "invert(100%)";
            document.getElementById("repositoryButtonImage").style.filter = "invert(100%)";
            document.getElementsByClassName("grid-container")[0].style.backgroundColor = "#1e1e1e";

            let buttons = document.getElementsByClassName("menu-button");

            for (let i = 0; i < buttons.length; i++) {
                let buttonLabel = buttons[i].getElementsByTagName("a")[0];
                buttonLabel.style.color = "#ffffff";
                buttons[i].style.borderColor = "#7f7f7f";
                // change the color of the button's border when hovered over
                buttons[i].onmouseover = function() {
                    buttons[i].style.borderColor = "#ffffff";
                }
                buttons[i].onmouseout = function() {
                    buttons[i].style.borderColor = "#7f7f7f";
                }
            }
            let footer = document.getElementsByClassName("footer")[0];
            footer.style.color = "#ffffff"
            footer.getElementsByTagName("a")[0].style.color = "#ffffff";
            footer.getElementsByTagName("a")[1].style.color = "#ffffff";
        }
    });

    for (let i = 1; i <= 9; i++) {
        createPageButton(document.getElementById(`menu-button-${i}`), i);
    }
})

function createPageButton(element, buttonIndex) {
    chrome.storage.sync.get(`Page${buttonIndex}`, function(data) {
        let pageName = data[`Page${buttonIndex}`]
        if (pageName) {
            fetch("../data/pages.json")
                .then(response => response.json())
                .then(data => {
                    let page = data[pageName];
                    let url = ""
                    if (pageName === '나의 학과'){
                        chrome.storage.sync.get('major', function(data) {
                            let majorName = data.major;
                            fetch("../data/major.json")
                                .then(response => response.json())
                                .then(json => {
                                    let major = json[majorName];
                                    if (major) {
                                        url = major.major;
                                        setPageButtonElement(element, pageName, url, "../images/icons/img_class.png");
                                    }
                                });
                        });
                    } else if (pageName === '나의 단과대학'){
                        chrome.storage.sync.get('major', function(data) {
                            let majorName = data.major;
                            fetch("../data/major.json")
                                .then(response => response.json())
                                .then(json => {
                                    let major = data[majorName];
                                    if (json) {
                                        url = major.college;
                                        setPageButtonElement(element, pageName, url, "../images/icons/img_class.png");
                                    }
                                });
                        });
                    } else {
                        url = page.url;
                        let image = page.image;
                        setPageButtonElement(element, pageName, url, image)
                    }
                }
            )
        } else {
            switch (buttonIndex) {
                case 1:
                    setPageButtonElement(element, "홈페이지", "https://www.hanyang.ac.kr/web/www/home", "../images/icons/img_homepage.png");
                    break;
                case 2:
                    setPageButtonElement(element, "포털", "https://portal.hanyang.ac.kr", "../images/icons/img_portal.png");
                    break;
                case 3:
                    setPageButtonElement(element, "LMS", "https://lms.hanyang.ac.kr", "../images/icons/img_lms.png");
                    break;
                case 4:
                    setPageButtonElement(element, "수강신청", "https://sugang.hanyang.ac.kr", "../images/icons/img_class.png");
                    break;
                case 5:
                    setPageButtonElement(element, "학사일정", "https://www.hanyang.ac.kr/web/www/cal_academic", "../images/icons/img_calendar.png");
                    break;
                case 6:
                    setPageButtonElement(element, "학술정보관", "https://information.hanyang.ac.kr/", "../images/icons/img_library.png");
                    break;
                case 7:
                    setPageButtonElement(element, "메일", "https://mail.google.com/", "../images/icons/img_class.png");
                    break;
                case 8:
                    setPageButtonElement(element, "전자출결", "https://check.hanyang.ac.kr", "../images/icons/img_class.png");
                    break;
                case 9:
                    setPageButtonElement(element, "오류 및 건의", "https://open.kakao.com/o/sW2kAinb", "../images/icons/img_calendar.png");
                    break;
            }
        }
    });
}

function setPageButtonElement(element, linkName, URL, IMG) {
    onSettingsButtonClick(element, URL);
    let buttonImage = document.createElement("img");
    let buttonLabel = document.createElement("p");
    buttonImage.src = IMG;
    buttonLabel.textContent = linkName;
    element.appendChild(buttonImage);
    element.appendChild(buttonLabel);
}

function onSettingsButtonClick(element, url) {
    element.addEventListener('click', function() {
        window.open(url);
    });
}