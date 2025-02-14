function loadApp() {
    var flipbook = $('.flipbook');

    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

    $('.flipbook .double').scissor();
    $('.flipbook').turn({
        elevation: 50,
        gradients: true,
        autoCenter: true
    });
}

yepnope({
    test: Modernizr.csstransforms,
    yep: ['lib/turn.min.js'],
    nope: ['lib/turn.html4.min.js'],
    both: ['lib/scissor.min.js', 'index.css'],
    complete: loadApp
});

// 💖 HEART & GLOWING EFFECTS
class Tool {
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class Heart {
    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = `hsl(${Tool.randomNumber(0, 360)}, 80%, 60%)`;
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.moveTo(this.x, this.y + this.r);
        ctx.bezierCurveTo(this.x - this.r * 1.3, this.y - this.r, this.x + this.r * 1.3, this.y - this.r, this.x, this.y + this.r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
        body.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }

    function createGlowingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("glowing-heart");
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 6 + 4}s`;
        body.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createFloatingHeart, 300);
    setInterval(createGlowingHeart, 500);
});

// 🎵 MUSIC BUTTON FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const musicButton = document.getElementById("musicButton");
    let musicPlayer = null;
    let isPlaying = false;
    const musicVideoIds = [
        "9A7MLzxSFDw", "A2c3q8QvnPE", "veTyslI3dBI",
        "Y_NlsTfI6xQ", "qWPWp-wnahU", "WoKEaxOMQxo", "t7iwBA4VWNc"
    ];

    function getNextVideo() {
        const index = Math.floor(Math.random() * musicVideoIds.length);
        return `https://www.youtube.com/embed/${musicVideoIds[index]}?autoplay=1&controls=0&loop=1&playlist=${musicVideoIds[index]}`;
    }

    function setupPlayer() {
        if (!musicPlayer) {
            musicPlayer = document.createElement("iframe");
            musicPlayer.style.position = "absolute";
            musicPlayer.style.left = "-9999px"; // Hide off-screen
            musicPlayer.style.width = "1px";
            musicPlayer.style.height = "1px";
            musicPlayer.allow = "autoplay; encrypted-media";
            document.body.appendChild(musicPlayer);
        }
    }

    musicButton.addEventListener("click", () => {
        if (!musicPlayer) {
            setupPlayer();
        }

        if (isPlaying) {
            musicPlayer.src = ""; // Stop
            isPlaying = false;
        } else {
            musicPlayer.src = getNextVideo();
            isPlaying = true;
        }
    });

    setInterval(() => {
        if (musicPlayer && isPlaying) {
            musicPlayer.src = getNextVideo();
        }
    }, 15000);
});
