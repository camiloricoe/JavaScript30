const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progressbar = document.querySelector('.progress');
const progressfill = document.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenButton = player.querySelector('.fullscreen');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    //const method = video.paused ? 'paly' :'pause';
    //video[method]();
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;

}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    //console.log(this) le pasa el elemeto, en este caso los rangos <input>
    video[this.name]=this.value;
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressfill.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX/progressbar.offsetWidth)*video.duration;
    video.currentTime = scrubTime
}

function fullScreenSize(){
    console.log("camilo")
    video.webkitRequestFullScreen();
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(skipButton=>skipButton.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false;
progressbar.addEventListener('click',scrub)

/* progressbar.addEventListener('mousemove',() => {
    if (mousedown){
        scrub();
    }
}) */

progressbar.addEventListener('mousemove', ()=> mousedown && scrub(e));
progressbar.addEventListener('mousedown',()=> mousedown = true);
progressbar.addEventListener('mouseup',()=> mousedown = false);

fullScreenButton.addEventListener('click',fullScreenSize);