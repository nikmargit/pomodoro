(function setUp() {
    var startBtn = document.getElementById("start");
    var pauseBtn = document.getElementById("pause");
    var msg = document.getElementById("msg");
    var resetBtn = document.getElementById("reset");
    var timer = document.getElementById("timer");
    var progresBar = document.getElementById("progres");
    var workTime = document.getElementById("custom-work-time");
    var pauseTime = document.getElementById("custom-pause-time");
    var segmentDiv = document.getElementById("segments");
    var audio = new Audio("sound.wav");
    var interval, work, pause, percentage, percentageCounter;
    var segments = 0;
    getInput();
    var time = work;
    var timeFlag = true;
    resetBar();
    setTimer(time);

    startBtn.addEventListener("click", function() {
        startBtn.disabled = true;
        msg.textContent = "Work Hard!\uD83D\uDCAA";
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
            segmentDiv.textContent =
                "Number of consecutive work segments: " + segments;
            audio.play();
            time = pause;
            timeFlag = !timeFlag;
            msg.textContent = "Chill!\u270C";
            resetBar();
        } else if (time < 0 && !timeFlag) {
            audio.play();
            time = work;
            timeFlag = !timeFlag;
            msg.textContent = "Work Hard!\uD83D\uDCAA";
            resetBar();
        }
        setTimer(time);
    }

    function getInput() {
        work = Number(workTime.value) * 60;
        pause = Number(pauseTime.value) * 60;
    }

    function setTimer() {
        var seconds = parseInt(time % 60);
        var minutes = parseInt(time / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
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
        pauseFlag = false;
        getInput();
        time = work;
        resetBar();
        clearInterval(interval);
        setTimer(time);
        msg.textContent = "Start working";
        startBtn.disabled = false;
        segments = 0;
        segmentDiv.textContent = "Number of consecutive work segments: 0";
    }
})();
