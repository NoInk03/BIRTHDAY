document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const dialogueText = document.getElementById("dialogue-text");
    const typingSound = new Audio("type-sound.mp3");

    // Tank and Explosion Elements
    const leftTank = document.querySelector(".left-tank");
    const rightTank = document.querySelector(".right-tank");
    const explosionContainer = document.getElementById("explosion-container");

    const dialogues = [
        "Hi!",
        "It's 22nd March,",
        "The Special Day!",
        "And here I am,", 
        "to.....",
        "               ",
        "tell....",
        "               ",
        "YOU",  // Tanks appear here
        "               ",
        "something you would have never thought of!",
        "               ",
        "YOU",
        "Have been chosen",
        "to be my partner in",
        "WORLD DOMINANCE!" // Explosion happens here
    ];

    let index = 0;
    let charIndex = 0;

    function typeDialogue() {
        if (charIndex < dialogues[index].length) {
            dialogueText.textContent += dialogues[index][charIndex];
            typingSound.currentTime = 0;
            typingSound.play();
            charIndex++;
            setTimeout(typeDialogue, 100);
        } else {
            // Start Tank Animation when "YOU" appears
            if (dialogues[index] === "YOU") {
                startTankAnimation();
            }
            // Trigger Explosion when "WORLD DOMINANCE!" appears
            if (dialogues[index] === "WORLD DOMINANCE!") {
                setTimeout(triggerExplosion, 500);
            }
            setTimeout(nextDialogue, 1500);
        }
    }

    function nextDialogue() {
        index++;
        if (index < dialogues.length) {
            dialogueText.textContent = "";
            charIndex = 0;
            typeDialogue();
        } else {
            // Redirect to jes.html after last dialogue
            setTimeout(() => {
                window.location.href = "jes.html";
            }, 2000);
        }
    }

    function startTankAnimation() {
        console.log("Tanks Moving!");
        leftTank.style.opacity = "1";
        rightTank.style.opacity = "1";
        leftTank.style.animation = "moveLeftTank 4s ease-in-out forwards";
        rightTank.style.animation = "moveRightTank 4s ease-in-out forwards";
    }

    function triggerExplosion() {
        console.log("Boom! Explosion triggered!");
        explosionContainer.style.display = "block"; // Show explosion

        // Play explosion sound
        const explosionSound = new Audio("sounds/explosion.mp3");
        explosionSound.volume = 1.0;  // Make it loud
        explosionSound.play();

        // Flash screen effect
        document.body.style.animation = "flashEffect 0.5s ease-in-out";

        // Hide explosion after 2.5 seconds
        setTimeout(() => {
            explosionContainer.style.opacity = "0";
        }, 2500);
    }

    // Start typing after 2 seconds
    setTimeout(typeDialogue, 2000);

    // Ensure background audio plays on click
    document.body.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }
    });

    console.log("Eerie script loaded...");
});
