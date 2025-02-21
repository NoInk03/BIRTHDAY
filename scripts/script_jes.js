document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const dialogueText = document.getElementById("dialogue-text");
    const typingSound = new Audio("type-sound.mp3"); // Sound effect for typing
    
    const dialogues = [
        "Oh hello there!",
        "Its 22nd March,",
        "The Special Day!",
        "And here I am!!!!!!!", 
        "Sorry for the delay",
        "Was caught up saving the world",
        "Im here to wish you a very very very",
        "Very Very Very Very Very Very",
        "Very Very Very Very Very Very",
        "HAPPY BIRTHDAY",
    ];
  
    let index = 0;
    let charIndex = 0;
  
    function typeDialogue() {
        if (charIndex < dialogues[index].length) {
            dialogueText.textContent += dialogues[index][charIndex];
            typingSound.currentTime = 0;  // Restart sound each letter
            typingSound.play();
            charIndex++;
            setTimeout(typeDialogue, 100); // Speed of typing effect
        } else {
            setTimeout(nextDialogue, 1500); // Wait and show next dialogue
        }
    }
  
    function nextDialogue() {
        index++;
        if (index < dialogues.length) {
            dialogueText.textContent = "";
            charIndex = 0;
            typeDialogue();
        }
    }
  
    // Start typing effect after 2 seconds
    setTimeout(typeDialogue, 2000);
  
    // Ensure background audio plays after user interaction (for browser autoplay policies)
    document.body.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }
    });
  
    console.log("Eerie script loaded...");
  });
  