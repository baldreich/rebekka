/* ==========================================
   Gute Reise Rebekka
   script.js
========================================== */

const plane = document.querySelector("#plane");
const message = document.querySelector("#message");
const heart = document.querySelector("#heart");

let start = null;
const duration = 18000; // 18 Sekunden

function easeInOut(t) {
    return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function animate(timestamp) {

    if (!start)
        start = timestamp;

    let progress = (timestamp - start) / duration;

    if (progress > 1)
        progress = 1;

    const t = easeInOut(progress);

    // Flugbahn
    const x = 120 + (window.innerWidth - 360) * t;

    const y =
        window.innerHeight * 0.60
        - Math.sin(t * Math.PI) * 220;

    // leichte Neigung
    const angle =
        -12 +
        Math.sin(t * Math.PI) * 18;

    plane.style.left = `${x}px`;
    plane.style.top = `${y}px`;

    plane.style.transform =
        `rotate(${angle}deg)`;

    // Herz erscheint
    if (t > 0.28 && t < 0.40) {

        heart.style.opacity = 1;

        heart.style.transform =
            `translateY(${
                -15 * Math.sin(t * 35)
            }px) scale(1.05)`;

    } else {

        heart.style.opacity = 0;

    }

    // Abschiedstext
    if (t > 0.88) {

        message.style.opacity =
            (t - 0.88) / 0.12;

    } else {

        message.style.opacity = 0;

    }

    if (progress < 1) {

        requestAnimationFrame(animate);

    } else {

        setTimeout(restartAnimation, 5000);

    }

}

function restartAnimation() {

    start = null;

    message.style.opacity = 0;

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);
