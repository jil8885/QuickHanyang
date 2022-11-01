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
})