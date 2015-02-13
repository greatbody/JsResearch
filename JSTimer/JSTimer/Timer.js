var tM = new TimerManager();
function TimerManager() {
    var nTimerId = 0;
    this.SetTimer = function(nSec, oFunc) {
        nTimerId = setInterval(oFunc, nSec);
    };
    this.CloseTimer = function() {
        if (nTimerId == 0) return;
        clearInterval(nTimerId);
        nTimerId = 0;
    };
}

function onBtnBegin() {
    tM.SetTimer(1000, tested);
}

function onBtnStop() {
    tM.CloseTimer();
}
function tested() {
    var oSpan = document.getElementById("showtip");
    oSpan.innerText = (new Date).toString();
}
