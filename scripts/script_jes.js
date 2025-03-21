document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const dialogueText = document.getElementById("dialogue-text");
    const typingSound = new Audio("type-sound.mp3"); 
    const krishna = document.getElementById("krishna");
    const speechBubble = document.getElementById("speech-bubble");

    // Create Ash image element
    const ash = document.createElement("img");
    ash.src = "/photos/ash.png"; // Ensure correct path
    ash.id = "ash";
    ash.style.position = "absolute";
    ash.style.width = "200px"; // Adjust size as needed
    ash.style.right = "-250px"; // Start off-screen (right)
    ash.style.bottom = "10%";
    ash.style.opacity = "0"; // Hide initially
    document.body.appendChild(ash); // Add Ash to the page

    // Jesus' dialogues
    const jesusDialogues = [
        "Pffff Go Away Hitler",
        "Always causing trouble",
        "Oh hello there!",
        "It's 22nd March,",
        "The Special Day!",
        "And here I am!!!!!!!", 
        "Sorry for the delay",
        "Was caught up saving the world",
        "I'm here to wish you a very very very",
        "Very Very Very Very Very Very",
        "Very Very Very Very Very Very",
        "HAPPY BIRTHDAY",
        "Ooo look who is here!"
    ];

    let jesusIndex = 0;
    let charIndex = 0;

    function typeDialogue() {
        if (charIndex < jesusDialogues[jesusIndex].length) {
            dialogueText.textContent += jesusDialogues[jesusIndex][charIndex];
            typingSound.currentTime = 0;
            typingSound.play();
            charIndex++;
            setTimeout(typeDialogue, 100);
        } else {
            setTimeout(nextDialogue, 1500);
        }
    }

    function nextDialogue() {
        jesusIndex++;
        if (jesusIndex < jesusDialogues.length) {
            dialogueText.textContent = "";
            charIndex = 0;
            typeDialogue();
        } else {
            setTimeout(startKrishnaSequence, 2000); // Krishna enters
        }
    }

    // Krishna's dialogues
    const krishnaDialogues = [
        "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
        "कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः",
        "ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು!",
        "आपका जन्मदिन मंगलमय हो, वत्स!"
    ];

    let krishnaIndex = 0;

    function showDialogue() {
        if (krishnaIndex < krishnaDialogues.length) {
            speechBubble.textContent = krishnaDialogues[krishnaIndex];
            updateSpeechBubble();
            krishnaIndex++;
            setTimeout(showDialogue, 4000); // Adjust timing
        } else {
            // Krishna finished speaking, start fade-out
            setTimeout(fadeOutKrishna, 2000);
        }
    }

    function updateSpeechBubble() {
        let krishnaRect = krishna.getBoundingClientRect();
        speechBubble.style.left = `${krishnaRect.left + 50}px`; 
        speechBubble.style.top = `${krishnaRect.top - 40}px`;
        requestAnimationFrame(updateSpeechBubble);
    }

    function startKrishnaSequence() {
        dialogueText.textContent = "Ooo look who is here!";
        setTimeout(() => {
            krishna.style.display = "block";
            speechBubble.style.display = "block";
            krishna.style.opacity = "1";
            krishna.style.animation = "moveKrishna 20s linear forwards";
            setTimeout(showDialogue, 2000);
        }, 2000);
    }

    function fadeOutKrishna() {
        krishna.style.transition = "opacity 2s";
        krishna.style.opacity = "0";
        setTimeout(() => {
            krishna.style.display = "none";
            speechBubble.style.display = "none"; // Hide speech bubble too
            startAshSequence();
        }, 2000);
    }

    function startAshSequence() {
        const ash = document.getElementById("ash");
        const ashSpeech = document.getElementById("ash-speech"); // Get speech bubble
    
        ash.style.opacity = "1"; // Make Ash visible
        ash.classList.add("ash-move"); // Move Ash into view
    
        // Show the speech bubble with Ash's dialogue
        setTimeout(() => {
            ashSpeech.style.opacity = "1"; // Make speech visible
        }, 1000); // Show after Ash appears
    
        setTimeout(() => {
            // Hide speech bubble after some time
            ashSpeech.style.opacity = "0";
            
            setTimeout(() => {
                ash.style.opacity = "0"; // Fade out Ash
                setTimeout(jesusFinalDialogue, 1000);
            }, 1000);
        }, 4000); // Speech bubble stays visible for 4 seconds
    }
    
    function jesusFinalDialogue() {
        dialogueText.textContent = "Pfff, that was a lot of people. Let me take you on a magical journey!";
        setTimeout(() => {
            window.location.href = "tree.html"; // Redirect after final dialogue
        }, 3000);
    }

    setTimeout(typeDialogue, 2000);
    console.log("Eerie script loaded...");
});
