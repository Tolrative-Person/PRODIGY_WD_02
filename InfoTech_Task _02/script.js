
let timer;
let isRunning = false;
let time = 0; 
let lapTimes = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function startStopwatch() {
    if (isRunning) return;

    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    timer = setInterval(() => {
        time += 10; 
        display.textContent = formatTime(time);
    }, 10);
}

function pauseStopwatch() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(timer);
    startPauseBtn.textContent = 'Resume';
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    time = 0;
    display.textContent = '00:00.00';
    lapTimes = [];
    lapsContainer.innerHTML = '';
    startPauseBtn.textContent = 'Start';
}

function recordLap() {
    if (!isRunning) return;

    lapTimes.push(time);
    const lapTime = formatTime(time);
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
