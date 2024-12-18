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

    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'block';
      i++;
    }

  } else {

    // hide all movies
    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'none';
      i++;
    }

    fetch('DB.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }
    return response.text();
  })
  .then(data => {
    //console.log(data);
    const moviesArray = data.split('\n').map(line => ({ title: line.trim() }));
    // console.log(moviesArray);

    // Set up Fuse.js with the data
    const options = { keys: ['title'], threshold: 0.3 };
    const fuse = new Fuse(moviesArray, options);

    const query = searchBarValue
    const results = fuse.search(query);
    const finalResult = results.map(result => result.item.title).join(", ").replace(/['"]/g, "");
    console.log(finalResult);

      // find the movie
      const searcher = document.getElementById(`${finalResult}`); // returns null if !var

      console.log(searchBarValue);
      console.log(searcher);

      if (searcher) {

        searcher.style.display = 'block';

      } else {
        alert('no results');
      }

  })
  .catch(error => console.error('Error:', error));

  }

  };


  filterIcon.onclick = () => {

  const searchBarValue = document.getElementById('searchBar').value;

  if (!searchBarValue) {
    console.log('nothing');

    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'block';
      i++;
    }

  } else {

    // hide all movies
    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'none';
      i++;
    }

    fetch('DB.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }
    return response.text();
  })
  .then(data => {
    //console.log(data);
    const moviesArray = data.split('\n').map(line => ({ title: line.trim() }));
    // console.log(moviesArray);

    // Set up Fuse.js with the data
    const options = { keys: ['title'], threshold: 0.3 };
    const fuse = new Fuse(moviesArray, options);

    const query = searchBarValue
    const results = fuse.search(query);
    const finalResult = results.map(result => result.item.title).join(", ").replace(/['"]/g, "");
    console.log(finalResult);

      // find the movie
      const searcher = document.getElementById(`${finalResult}`); // returns null if !var

      console.log(searchBarValue);
      console.log(searcher);

      if (searcher) {

        searcher.style.display = 'block';

      } else {
        alert('no results');
      }

  })
  .catch(error => console.error('Error:', error));

  }
  };


  //searchBar enter key
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener("keydown", (event) => {
  if (event.key == 'Enter') {
  

  const searchBarValue = document.getElementById('searchBar').value;

  if (!searchBarValue) {
    console.log('nothing');

    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'block';
      i++;
    }

  } else {

    // hide all movies
    let i = 0;
    while (i < divs.length) {
      divs[i].style.display = 'none';
      i++;
    }

    fetch('DB.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }
    return response.text();
  })
  .then(data => {
    //console.log(data);
    const moviesArray = data.split('\n').map(line => ({ title: line.trim() }));
    // console.log(moviesArray);

    // Set up Fuse.js with the data
    const options = { keys: ['title'], threshold: 0.3 };
    const fuse = new Fuse(moviesArray, options);

    const query = searchBarValue
    const results = fuse.search(query);
    const finalResult = results.map(result => result.item.title).join(", ").replace(/['"]/g, "");
    console.log(finalResult);

      // find the movie
      const searcher = document.getElementById(`${finalResult}`); // returns null if !var

      console.log(searchBarValue);
      console.log(searcher);

      if (searcher) {

        searcher.style.display = 'block';

      } else {
        alert('no results');
      }

  })
  .catch(error => console.error('Error:', error));

  }

  }
}) 
