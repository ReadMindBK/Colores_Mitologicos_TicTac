// =====================
// TIEMPO
// =====================

let T = 120;
let t = T;
let x = null;

// Elementos
const o = document.getElementById("time");
const c = document.getElementById("prog");
const ring = document.querySelector(".ring");

// Circunferencia automática
const C = 2 * Math.PI * parseFloat(c.getAttribute("r"));

c.style.strokeDasharray = C;
c.style.strokeDashoffset = 0;

// =====================
// AUDIOS
// =====================

const bgMusic = new Audio("audio/musica.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.2;

const alarm = new Audio("audio/alarma.mp3");
alarm.volume = 1;

// =====================
// ACTUALIZAR PANTALLA
// =====================

function upd() {

o.textContent =
    Math.floor(t / 60) +
    ":" +
    String(t % 60).padStart(2, "0");

    const f = t / T;

    c.style.strokeDashoffset = C * (1 - f);

    if (f > 0.5) {

        c.style.stroke = "#00d26a";
        c.style.filter = "drop-shadow(0 0 4px rgba(0,210,106,.45))";

    } else if (f > 0.25) {

        c.style.stroke = "#ffd000";
        c.style.filter = "drop-shadow(0 0 5px rgba(255,208,0,.45))";

    } else {

        c.style.stroke = "#ff3030";
        c.style.filter = "drop-shadow(0 0 6px rgba(255,60,60,.5))";
    }


}

// =====================
// BOTONES
// =====================

function act(i) {

    [b1, b2, b3].forEach((e, n) => {

        e.classList.toggle("active", n === i);

    });

}

upd();

// =====================
// INICIAR
// =====================

function start() {

    act(0);

    if (x) return;

    ring.classList.add("running");

    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }

    x = setInterval(() => {

        if (t > 0) {

            t--;
            upd();

        } else {

            clearInterval(x);
            x = null;

            ring.classList.remove("running");

            act(-1);

            stopBg();

            beep();

        }

    }, 1000);

}

// =====================
// PAUSA
// =====================

function pauseT() {

    act(1);

    clearInterval(x);
    x = null;

    ring.classList.remove("running");

    bgMusic.pause();

}

// =====================
// RESET
// =====================

function resetT() {

    act(2);

    clearInterval(x);
    x = null;

    ring.classList.remove("running");

    t = T;

    bgMusic.pause();
    bgMusic.currentTime = 0;

    upd();

}

// =====================
// DETENER MÚSICA
// =====================

function stopBg() {

    bgMusic.pause();
    bgMusic.currentTime = 0;

}

// =====================
// ALARMA
// =====================

function beep() {

    alarm.currentTime = 0;
    alarm.play().catch(() => {});

}