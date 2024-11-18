document.getElementById('sendButton').addEventListener('click', () => {
  const psswd = document.getElementById('psswd').value;
  const movieNameValue = document.getElementById('movieName').value;
  const movieDescriptionValue = document.getElementById('movieDescription').value;
  const imageInput = document.getElementById('imageInput');
  const para1 = document.getElementById('para1').value;
  const image1 = document.getElementById('image1');
  const image2 = document.getElementById('image2');
  const image3 = document.getElementById('image3');
  const image4 = document.getElementById('image4');
  

  const file = imageInput.files[0];
  const file1 = image1.files[0]; 
  const file2 = image2.files[0];
  const file3 = image3.files[0];
  const file4 = image4.files[0];

  if (!psswd) {
    alert('enter password');
    return;
  }

  if (!movieNameValue) {
    alert('movie name is empty');
    return;
  }

  if (!movieDescriptionValue) {
    alert('movie description is empty');
    return;
  }

  if (!file) {
    alert('Please select file');
    return;
  }

  if (!para1) {
    alert('para1 is empty');
    return;
  }

  if (!file1) {
    alert('Please select file1');
    return;
  }

  if (!file2) {
    alert('Please select file2');
    return;
  }


  if (!file3) {
    alert('Please select file3');
    return;
  }

  if (!file4) {
    alert('Please select file4');
    return;
  }


  const formData = new FormData();
  formData.append('receivedPsswd', psswd);
  formData.append('movieName', movieNameValue);
  formData.append('movieDescription', movieDescriptionValue);
  formData.append('movieImage', file);
  formData.append('para1', para1);
  formData.append('image1', file1);
  formData.append('image2', file2);
  formData.append('image3', file3);
  formData.append('image4', file4);

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
        alert('it already exists in db SO FUCK OFF');
      } else if (data == 'bc') {
        alert('password is incorrect');
      } else {
        alert('done');
      }

    })
    .catch(error => {
      console.error(error);
    });
});