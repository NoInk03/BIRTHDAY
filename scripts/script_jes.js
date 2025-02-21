document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const dialogueText = document.getElementById("dialogue-text");
    const typingSound = new Audio("type-sound.mp3"); 
    const krishna = document.getElementById("krishna");
    const speechBubble = document.getElementById("speech-bubble");

    // Jesus' dialogues
    const jesusDialogues = [
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
        "Whenever righteousness declines, I manifest Myself.",
        "HAPPY BIRTHDAY, VATS!",
        "Wishing you all the happiness in the world!",
        "Stay blessed and keep shining!"
    ];

    let krishnaIndex = 0;

    function showDialogue() {
        if (krishnaIndex < krishnaDialogues.length) {
            speechBubble.textContent = krishnaDialogues[krishnaIndex];
            updateSpeechBubble();  // Adjust position dynamically
            krishnaIndex++;
            setTimeout(showDialogue, 4000); // Increase timing to sync with movement
        }
    }

    function updateSpeechBubble() {
        let krishnaRect = krishna.getBoundingClientRect();
        speechBubble.style.left = `${krishnaRect.left + 50}px`; 
        speechBubble.style.top = `${krishnaRect.top - 40}px`;
        requestAnimationFrame(updateSpeechBubble);
    }

    function startKrishnaSequence() {
        dialogueText.textContent = "Ooo look who is here!"; // Jesus' reaction
        setTimeout(() => {
            krishna.style.display = "block"; // Show Krishna
            speechBubble.style.display = "block";
            krishna.style.opacity = "1"; // Make Krishna visible
            krishna.style.animation = "moveKrishna 20s linear forwards"; // Start Krishna's movement
            setTimeout(showDialogue, 2000); // Start Krishna's dialogues after he appears
        }, 2000); // Delay for dramatic effect
    }
    
    setTimeout(typeDialogue, 2000);
    console.log("Eerie script loaded...");
});
