const themeList = ["Light", "Dark"];

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
});