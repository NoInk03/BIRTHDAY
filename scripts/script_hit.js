document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const dialogueText = document.getElementById("dialogue-text");
    const typingSound = new Audio("type-sound.mp3");
  
    const dialogues = [
        "Hi!",
        "It's 22nd March,",
        "The Special Day!",
        "And here I am,", 
        "to.....",
        "               ",
        "tell....",
        "               ",
        "YOU",
        "               ",
        "something you would have never thought of!",
        "               ",
        "YOU",
        "Have been chosen",
        "to be my partner in",
        "WORLD DOMINANCE!"
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
            // If last dialogue is complete, redirect to jes.html
            setTimeout(() => {
                window.location.href = "jes.html";
            }, 2000); // Redirect after 2 seconds for suspense
        }
    }
  
    setTimeout(typeDialogue, 2000);
  
    document.body.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }
    });
  
    console.log("Eerie script loaded...");
  });
  