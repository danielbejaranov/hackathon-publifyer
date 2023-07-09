/*const videoUploadInput = document.getElementById('video-upload');
const videoPlayer = document.getElementById('video-player');
const videoPlayerContainer = document.getElementById('video-player-container');

videoUploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const videoURL = URL.createObjectURL(file);
  videoPlayer.src = videoURL;

  videoPlayerContainer.style.display = 'flex';
  videoPlayer.load();
});*/

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const videoUploadInput = document.getElementById('video-upload');
  const videoPlayer = document.getElementById('video-player');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedOptions = Array.from(document.querySelectorAll('input[name="opciones"]:checked')).map(input => input.value);
    
    if (selectedOptions.length === 0) {
      alert('Selecciona al menos una opción');
      return;
    }
    
    const formData = new FormData();
    formData.append('video', videoUploadInput.files[0]);
    formData.append('id', selectedOptions[0]); 
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      console.log(data);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });
  
  videoUploadInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      videoPlayer.src = URL.createObjectURL(file);
    } else {
      videoPlayer.src = '';
    }
  });
});
