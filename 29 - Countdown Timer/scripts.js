let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{
        const seconsdLeft = Math.round((then - Date.now())/1000);
        if (seconsdLeft<0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(seconsdLeft)
    },1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds/60);
    let remainSeconds = seconds % 60;
    const display = `${minutes}:${remainSeconds < 10 ? '0' : '' }${remainSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent=`Be back at ${hour>12 ? hour-12 : hour}:${minutes< 10 ? '0' : '' }${minutes}`
}

function startTimer() {
    timer(parseInt(this.dataset.time)); 
}

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes*60)
    this.reset();
})
buttons.forEach(button => button.addEventListener('click',startTimer))