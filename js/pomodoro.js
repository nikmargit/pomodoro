(function setUp() {
    const startBtn = document.getElementById("start");
    const pauseBtn = document.getElementById("pause");
    const msg = document.getElementById("msg");
    const resetBtn = document.getElementById("reset");
    const timer = document.getElementById("timer");
    const progresBar = document.getElementById("progres");
    const workTime = document.getElementById("custom-work-time");
    const pauseTime = document.getElementById("custom-pause-time");
    const segmentDiv = document.getElementById("segments");
    const audio = new Audio("sound.wav");
    let interval, work, pause, percentage, percentageCounter, time;
    let segments = 0;
    getInput();
    let timeFlag = true;
    resetBar();
    setTimer(time);

    startBtn.addEventListener("click", function() {
        startBtn.disabled = true;
        if (segments > 0 && segments % 4 === 0) {
            msg.textContent = "Time for a longer break!";
        } else {
            msg.textContent = "Work!\uD83D\uDCAA";
        }
        interval = setInterval(countdown, 1000);
    });

    pauseBtn.addEventListener("click", function() {
        clearInterval(interval);
        startBtn.disabled = false;
    });

    resetBtn.addEventListener("click", resetPomodoro);

    function countdown() {
        if (time < 0 && timeFlag) {
            segments++;
            segmentDiv.textContent = segments;
            audio.play();
            time = pause;
            timeFlag = !timeFlag;
            msg.textContent = "Chill!\u270C";
            if (segments % 4 === 0) {
                time = 900;
                msg.textContent = "Time for a longer break!";
            }
            resetBar();
        } else if (time < 0 && !timeFlag) {
            audio.play();
            time = work;
            timeFlag = !timeFlag;
            msg.textContent = "Work!\uD83D\uDCAA";
            resetBar();
        }
        setTimer(time);
    }

    function getInput() {
        work = Number(workTime.value) * 60;
        pause = Number(pauseTime.value) * 60;
        time = work;
    }

    function setTimer() {
        let seconds = parseInt(time % 60);
        let minutes = parseInt(time / 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        timer.innerHTML = minutes + ":" + seconds;
        progresBar.style.width = (percentageCounter - time) * percentage + "%";
        time--;
    }

    function resetBar() {
        percentage = 1 / time * 100;
        percentageCounter = time;
        progresBar.style.width = "0%";
    }

    function resetPomodoro() {
        timeFlag = true;
        getInput();
        time = work;
        resetBar();
        clearInterval(interval);
        setTimer(time);
        msg.textContent = "Start working";
        startBtn.disabled = false;
        segments = 0;
        segmentDiv.textContent = 0;
    }
})();
