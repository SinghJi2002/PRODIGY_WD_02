document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const clearButton = document.getElementById('clear');

    const hourDisplay = document.getElementById('hour');
    const minDisplay = document.getElementById('min');
    const secDisplay = document.getElementById('sec');
    const lapLog = document.getElementById('lap-log');

    let timer;
    let isRunning = false;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let lapCount = 0;

    function updateDisplay() {
        hourDisplay.textContent = String(hours).padStart(2, '0');
        minDisplay.textContent = String(minutes).padStart(2, '0');
        secDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
                updateDisplay();
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            isRunning = false;
            clearInterval(timer);
        }
    }

    function resetTimer() {
        pauseTimer();
        hours = 0;
        minutes = 0;
        seconds = 0;
        lapCount = 0; // Reset lap count on reset
        updateDisplay();
    }

    function logLap() {
        lapCount++;
        const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const lapEntry = document.createElement('div');
        lapEntry.textContent = `Lap ${lapCount}                ${lapTime}`;
        lapLog.appendChild(lapEntry);
    }

    function clearLapLog() {
        lapLog.innerHTML = '';
        lapCount = 0; // Reset lap count on clear
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', logLap);
    clearButton.addEventListener('click', clearLapLog);

    updateDisplay();
});
