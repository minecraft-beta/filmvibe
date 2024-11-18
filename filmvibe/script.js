const burger = document.getElementById('burger');
const menuPage = document.getElementById('menuPage');

burger.addEventListener('change', function () {
    if (burger.checked) {
      menuPage.style.display = 'block'; // Make the menu visible
      setTimeout(() => { // Allow transition to apply
        menuPage.style.opacity = '1';
        menuPage.style.transform = 'translateX(0)';
      }, 10); // Small delay to ensure the styles are applied
    } else {
      menuPage.style.opacity = '0';
      menuPage.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        menuPage.style.display = 'none'; // Hide the menu after the animation
      }, 500); // Match the transition duration
    }
  });
  

