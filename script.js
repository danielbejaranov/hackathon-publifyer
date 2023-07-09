const videoUploadInput = document.getElementById('video-upload');
const videoPlayer = document.getElementById('video-player');
const videoPlayerContainer = document.getElementById('video-player-container');

videoUploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const videoURL = URL.createObjectURL(file);
  videoPlayer.src = videoURL;

  videoPlayerContainer.style.display = 'flex';
  videoPlayer.load();
});
