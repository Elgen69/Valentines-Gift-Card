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

// 💖 FLOATING HEARTS (RESTORED FROM PREVIOUS PROJECT)
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
document.addEventListener("DOMContentLoaded", () => {
    const rotateMessage = document.getElementById("rotateMessage");
    const flipbookViewport = document.querySelector(".flipbook-viewport");

    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            rotateMessage.style.display = "block";
        } else {
            rotateMessage.style.display = "none";
        }
    }

    // Run on load and when resizing
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    // Zoom out effect on load
    flipbookViewport.style.transform = "scale(0.8)";
    setTimeout(() => {
        flipbookViewport.style.transition = "transform 0.5s ease-in-out";
        flipbookViewport.style.transform = "scale(1)";
    }, 500);
});

function adjustLayout() {
    const flipbookContainer = document.querySelector('.flipbook-viewport');
    const rotateMessage = document.querySelector('#rotateMessage');

    if (window.innerWidth > window.innerHeight) {
        // Landscape Mode: Ensure card is visible
        flipbookContainer.style.display = 'flex';
        flipbookContainer.style.transform = 'scale(1)'; // Reset scaling
        if (rotateMessage) rotateMessage.style.display = 'none';
    } else {
        // Portrait Mode: Show rotate message & scale down card to fit
        flipbookContainer.style.transform = 'scale(0.8)'; // Shrink card slightly
        if (rotateMessage) rotateMessage.style.display = 'block';
    }
}

// Detect Rotation Changes
window.addEventListener("resize", adjustLayout);
document.addEventListener("DOMContentLoaded", adjustLayout);
