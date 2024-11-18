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
  
  const searchIcon = document.getElementById('search-icon');
  const filterIcon = document.getElementById('filter-icon');
  const divs = document.getElementsByClassName('divs');
  
  searchIcon.onclick = () => {
    const searchBarValue = document.getElementById('searchBar').value;
    
  if (!searchBarValue) {
    console.log('nothing');
  } else {

    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'none';
      i++;
    }
      const searcher = document.getElementById(`${searchBarValue}`);

      console.log(searchBarValue);
      console.log(searcher);

      if (searcher) {

        searcher.style.display = 'block';

      } else {
        alert('no results');
      }
  }
  };

  filterIcon.onclick = () => {
  const searchBarValue = document.getElementById('searchBar').value;

  if (!searchBarValue) {
    console.log('nothing');
  } else {

    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'none';
      i++;
    }
      const searcher = document.getElementById(`${searchBarValue}`);

      console.log(searchBarValue);
      console.log(searcher);

      if (searcher) {

        searcher.style.display = 'block';

      } else {
        alert('no results');
      }
  }
  };
