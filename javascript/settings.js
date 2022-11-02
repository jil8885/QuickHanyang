const themeList = ["Light", "Dark"];
const majorList = ['소프트웨어학부', 'ICT융합학부', '인공지능학과', '기계공학과', '로봇공학과', '산업경영공학과', '전자공학부', '재료화학공학과', '생명나노공학과', '건축학부', '건설환경플랜트공학과', '교통물류공학과', '국방정보공학과', '융합공학과', '스마트융합공학부', '약학과', '응용수학과', '응용물리학과', '화학분자공학 과', '분자생명과학과', '해양융합공학과', '나노광전자학과', '한국언어문학과', '문화인류학과', '문화콘텐츠학과', '중국학과', '일본학과', '영미언어문화학과', '프랑스학 과', '정보사회미디어학과', '광고홍보학과', '경제학부', '경영학부', '보험계리학과', '회계세무학과', '주얼리·패션디자인학과', '산업디자인학과', '커뮤니케이션디자인학과', '영상디자인학과', '스포츠과학부', '무용예술학과', '실용음악학과']
const pageList =  ["홈페이지", "포털", "LMS", "수강신청", "학사일정", "전자출결", "학생식당", "교직원식당", "푸드코트", "기숙사식당", "창업보육센터", "나의 단과대학", "나의 학과", "학술정보관", "오류 및 건의"];

window.addEventListener('load', function() {
    let themeColor = document.getElementById('theme-color-button');
    themeList.forEach(function(theme) {
        let selectThemeButton = document.createElement('button');
        selectThemeButton.textContent = theme;
        selectThemeButton.addEventListener('click', function() {
            chrome.storage.sync.set({theme: theme}, function() {
                console.log('Theme set to ' + theme);
            });
        });
        themeColor.appendChild(selectThemeButton);
    });

    let selectMajorElement = document.getElementById('select-major-button');
    chrome.storage.sync.get('major', function(data) {
        majorList.forEach(function(major) {
            let majorSelectButton = document.createElement('option');
            majorSelectButton.textContent = major;
            majorSelectButton.value = major;
            if (data.major === major) {
                majorSelectButton.selected = true;
            }
            selectMajorElement.appendChild(majorSelectButton);
        });
    });
    let button = document.createElement('button');
    button.id = "save-major-button";
    button.textContent = "저장";
    button.addEventListener('click', function() {
        if(selectMajorElement.selectedIndex === 0){
            alert("학과를 선택해주세요.");
            return;
        }
        let data = selectMajorElement.options[selectMajorElement.selectedIndex].value;
        chrome.storage.sync.set({major: data}, function() {
            window.alert(data + "로 변경 완료!");
        });
    });
    selectMajorElement.parentNode.appendChild(button);
    for(let i = 1; i <= 9; i++){
        insertPageButton(i);
    }
});

function insertPageButton(itemPosition){
    let element = document.getElementById(`button-link-${itemPosition}`);
    pageList.forEach(function(page) {
        let pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.className = "page-button";
        pageButton.addEventListener('click', function() {
            chrome.storage.sync.set({[`Page${itemPosition}`]: page}, function() {
                console.log('Page set to ' + page);
            });
        });
        element.appendChild(pageButton);
    });
}