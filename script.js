document.addEventListener("DOMContentLoaded", function () {
    let mediaElements = document.querySelectorAll(".gallery img, .gallery video");
    let columns = 5; // Number of columns
    let rows = 4; // Number of rows
    let total = mediaElements.length;
    let order = [];

    // 🔹 Snake Pattern (Row-wise Left-Right, Right-Left)
    for (let r = 0; r < rows; r++) {
        let rowElements = [];
        for (let c = 0; c < columns; c++) {
            let index = r * columns + c;
            if (index < total) rowElements.push(index);
        }
        if (r % 2 !== 0) rowElements.reverse(); // Reverse every alternate row for snake effect
        order.push(...rowElements);
    }

    // 🔹 Cross (X) Pattern - Top-Left to Bottom-Right
    let crossOrder1 = [];
    let crossOrder2 = [];
    for (let d = 0; d < rows + columns - 1; d++) {
        for (let r = 0; r < rows; r++) {
            let c = d - r;
            if (c >= 0 && c < columns) {
                let index1 = r * columns + c;
                let index2 = r * columns + (columns - c - 1);
                if (index1 < total) crossOrder1.push(index1);
                if (index2 < total) crossOrder2.push(index2);
            }
        }
    }

    // 🔹 Column-wise (Top to Bottom, then Bottom to Top)
    let columnOrder = [];
    for (let c = 0; c < columns; c++) {
        let colElements = [];
        for (let r = 0; r < rows; r++) {
            let index = r * columns + c;
            if (index < total) colElements.push(index);
        }
        if (c % 2 !== 0) colElements.reverse(); // Reverse every alternate column
        columnOrder.push(...colElements);
    }

    let patterns = [order, crossOrder1, crossOrder2, columnOrder]; // Combine all patterns
    let currentPattern = 0; // Track current animation pattern
    let index = 0; // Track position in sequence

    function autoHover() {
        mediaElements.forEach((el) => el.classList.remove("hover-effect")); // Remove effect from all

        let sequence = patterns[currentPattern]; // Get current pattern

        if (sequence[index] !== undefined) {
            mediaElements[sequence[index]].classList.add("hover-effect"); // Apply effect to current item
        }

        index++;

        if (index >= sequence.length) {
            index = 0; // Reset index
            currentPattern = (currentPattern + 1) % patterns.length; // Switch to next pattern
        }

        setTimeout(autoHover, 500); // Change every 1 second
    }

    autoHover(); // Start animation
});

// Fast Forward to "Pre-answer" section
document.getElementById("reveal-answer-btn").addEventListener("click", function () {
    document.getElementById("proposal-section").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("proposal-section").style.display = "none";
        document.getElementById("pre-answer-content").classList.remove("hidden");
    }, 1000);
});

// Handle "Yes" and "Absolutely Yes" button clicks in Pre-answer section
document.getElementById("yes").addEventListener("click", function () {
    // Go to Answer section without effects
    document.getElementById("pre-answer-content").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("pre-answer-content").style.display = "none";
        document.getElementById("answer-section").classList.remove("hidden");
    }, 1000);
});

document.getElementById("absolutely-yes").addEventListener("click", function () {
    // Go to Answer section without effects
    document.getElementById("pre-answer-content").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("pre-answer-content").style.display = "none";
        document.getElementById("answer-section").classList.remove("hidden");
    }, 1000);
});

// Play romantic music when "YES" is clicked in Answer section
document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("question").style.display = "none";
    document.getElementById("surprise-message").classList.remove("hidden");

    let audio = new Audio("kadhalar_dhinam_bgm.mp3"); // Replace with actual file
    audio.loop = true; // Set loop to true
    audio.play();

    confettiEffect();  // Start confetti animation
    setTimeout(fireworksEffect, 500); // Delay fireworks a bit
});

// Make "NO" button move away smoothly
document.getElementById("no-btn").addEventListener("mouseover", function() {
    let button = this;
    let maxX = window.innerWidth - button.offsetWidth;
    let maxY = window.innerHeight - button.offsetHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    button.style.position = "absolute";
    button.style.transition = "left 0.3s ease, top 0.3s ease"; // Smooth effect
    button.style.left = randomX + "px";
    button.style.top = randomY + "px";
});

function confettiEffect() {
    let count = 150; // Increase the number of confetti pieces
    let colors = ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#ff99ac", "#ffcad4"];

    for (let i = 0; i < count; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Random start position across the screen
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * window.innerHeight * 0.5 + "px"; // Start from top half

        // Random size for variation
        let size = Math.random() * 8 + 4; // Between 4px and 12px
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        // Random color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(confetti);

        // Animation settings
        let animationTime = Math.random() * 4 + 2; // Between 2s and 6s
        confetti.style.animation = `fall ${animationTime}s linear forwards`;

        setTimeout(() => {
            confetti.remove();
        }, animationTime * 1000);
    }
}

// Add CSS for smooth falling animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100vh); opacity: 0; }
}
.confetti {
    position: absolute;
    border-radius: 50%;
    z-index: 1000;
}
`;
document.head.appendChild(style);

function fireworksEffect() {
    let fireworkX = Math.random(); // Random X position (0 to 1)
    let fireworkY = Math.random() * 0.6; // Random Y (upper half of screen)

    confetti({
        particleCount: 300, // More particles
        spread: 200, // Spread widely
        startVelocity: 50, // Increase speed
        origin: { x: fireworkX, y: fireworkY },
    });
}

// Floating heart animation ❤️
function createHeart() {
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");

    document.body.appendChild(heart);

    let direction = Math.random(); // Random number to decide direction

    if (direction < 0.25) {
        // From Top
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = "-20px";
        heart.style.animation = "falling 3s linear forwards";
    } else if (direction < 0.5) {
        // From Bottom
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "-20px";
        heart.style.animation = "floating 3s linear forwards";
    } else if (direction < 0.75) {
        // From Left
        heart.style.left = "-20px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        heart.style.animation = "moveRight 3s linear forwards";
    } else {
        // From Right
        heart.style.right = "-20px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        heart.style.animation = "moveLeft 3s linear forwards";
    }

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Create floating hearts every 300ms
setInterval(createHeart, 300);

// Typing Effect for Proposal Text ⌨️
function typeWriterEffect(text, elementId, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

typeWriterEffect("I have a question... will you be mine?", "proposal-text", 100);  // Text to be typed
