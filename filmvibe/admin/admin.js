document.getElementById('sendButton').addEventListener('click', () => {
  const movieNameValue = document.getElementById('movieName').value;
  const movieDescriptionValue = document.getElementById('movieDescription').value;
  const imageInput = document.getElementById('imageInput');

  const file = imageInput.files[0]; // Get the selected file

  if (!movieNameValue) {
    alert('movie name is empty');
    return;
  }

  if (!movieDescriptionValue) {
    alert('movie description is empty');
    return;
  }

  if (!file) {
    alert('Please select a file first!');
    return;
  }

  const formData = new FormData();
  formData.append('movieName', movieNameValue); // Add text fields
  formData.append('movieDescription', movieDescriptionValue); // Add text fields
  formData.append('movieImage', file); // Add the file

  fetch('/dataReceiver', {
    method: 'POST',
    body: formData, // Send the FormData object
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data);

      if (data == 'exists') {
        alert('it already exists in DB');
      } else {
        alert('done');
      }

    })
    .catch(error => {
      console.error(error);
    });
});

/* /dataReceiver ki bakchodi done */


