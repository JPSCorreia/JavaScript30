

// Get Elements:
const player = document.querySelector('.player')
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const muteButton = document.querySelector('.mute__button')
const fullscreenButton = document.querySelector('.fullscreen__button')

// Event Handler Functions:
function togglePlay () {
  if(video.paused) {
    video.play()
  } else {
    video.pause()
  }
}


function updateButton () {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}


function skip () {
  video.currentTime += parseFloat(this.dataset.skip)
}


function handleRangeUpdate () {
  video[this.name] = this.value
}

function handleProgressBar () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleVideoMute(){
	if(video.muted){
		video.muted = false;
		mute__button.innerHTML = "volume_mute";
	} else {
		video.muted = true;
		mute__button.innerHTML = "volume_off";
	}
}

function toggleFullScreen(){
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
};


// Event Listeners:
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

video.addEventListener('timeupdate', handleProgressBar)


progress.addEventListener('click', scrub)
progress.addEventListener('mousedown',() => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

let mousedown = false;
//Check if mousedown is true, if yes execute scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));


muteButton.addEventListener('click', handleVideoMute)

fullscreenButton.addEventListener('click', toggleFullScreen, false);