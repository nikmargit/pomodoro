(function setUp() {
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    var msg = document.getElementById("msg");
    var reset = document.getElementById("reset");
    var timer = document.getElementById("timer");
    var progresBar = document.getElementById("progres");
    var timeFlag = true;
    var pauseFlag = false;
    var time = 15;
    var percentage = 1 / time * 100;
    var percentageCounter = time;
    var interval;
    setTimer(time);

    start.addEventListener("click", function() {
        if (pauseFlag) return;
        pauseFlag = true;
        interval = setInterval(countdown, 1000);
    });

    stop.addEventListener("click", function() {
        clearInterval(interval);
        pauseFlag = false;
    });

    reset.addEventListener("click", resetPomodoro);

    function countdown() {
        if (time < 0 && timeFlag) {
            time = 5;
            timeFlag = !timeFlag;
            msg.textContent = "Chill!";
            resetBar();
        } else if (time < 0 && !timeFlag) {
            time = 15;
            timeFlag = !timeFlag;
            msg.textContent = "Work Hard!";
            resetBar();
        }
        setTimer(time);
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
        time = 15;
        resetBar();
        clearInterval(interval);
        setTimer(time);
        msg.textContent = "Work Hard!";
    }
})();
