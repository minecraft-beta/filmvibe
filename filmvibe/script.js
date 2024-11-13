const burger = document.getElementById('burger');
const menuPage = document.getElementById('menuPage');

burger.addEventListener('change', function() {
    if (burger.checked) {
    menuPage.style.display = 'block';
    } else if (!burger.checked) {
        menuPage.style.display = 'none';
    }
});

