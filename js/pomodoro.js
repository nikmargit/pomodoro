var start = document.getElementById("start");
var stop = document.getElementById("stop");
var msg = document.getElementById("msg");
var flag = true;
var time = 1500;

function timer() {
    var timer = document.getElementById("timer");
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
    if (time < 0 && flag) {
        time = 300;
        flag = !flag;
        msg.textContent = "Chill!";
    } else if (time < 0 && !flag) {
        time = 1500;
        flag = !flag;
        msg.textContent = "Work Hard!";
    }
}

start.addEventListener("click", function(e) {
    if (e.currentTarget.dataset.triggered) return;
    e.currentTarget.dataset.triggered = true;
    setInterval(timer, 1000);
});
