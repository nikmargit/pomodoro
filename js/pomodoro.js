function setUp() {
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    var msg = document.getElementById("msg");
    var timeFlag = true;
    var pauseFlag = false;
    var time = 15;
    var interval;
    var timer = document.getElementById("timer");

    start.addEventListener("click", function() {
        if (pauseFlag) return;
        pauseFlag = true;
        interval = setInterval(countdown, 1000);
    });

    stop.addEventListener("click", function() {
        clearInterval(interval);
        pauseFlag = false;
    });

    function countdown() {
        if (time < 0 && timeFlag) {
            time = 5;
            timeFlag = !timeFlag;
            msg.textContent = "Chill!";
        } else if (time < 0 && !timeFlag) {
            time = 15;
            timeFlag = !timeFlag;
            msg.textContent = "Work Hard!";
        }

        var seconds = parseInt(time % 60);
        var minutes = parseInt(time / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.innerHTML = minutes + ":" + seconds;
        time--;
    }
}

setUp();
