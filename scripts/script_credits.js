const conversation = [
    { speaker: "Hitler", text: "Wait... how are you even here?" },
    { speaker: "Jesus", text: "Well, I am Jesus. I kinda have super powers" },
    { speaker: "Hitler", text: "Alright… so what do you want?" },
    { speaker: "Jesus", text: "Listen, today is Richa’s birthday." },
    { speaker: "Jesus", text: "Maybe, just for today, we forget all the war and chaos and just spread some love?" },
    { speaker: "Hitler", text: "Hmph... fine. But only because it's her birthday." },
    { speaker: "Jesus", text: "That’s the spirit! See, peace isn’t so bad, right?" },
    { speaker: "Hitler", text: "Yeah, yeah, don’t get used to it." },
    { speaker: "Jesus", text: "Alright, let’s do this together!" },
    { speaker: "Both", text: "🎉 Happy Birthday, Richa! 🎉" } // Last line before credits
];

let index = 0;
const hitlerDialogue = document.getElementById("hitler-dialogue");
const jesusDialogue = document.getElementById("jesus-dialogue");
const creditsDiv = document.getElementById("credits-container");

const birthdayAudio = new Audio("sounds/birthdaysong.mp3");
const wishAudio = new Audio("sounds/wish.mp3");

function showNextDialogue() {
    if (index < conversation.length) {
        let speaker = conversation[index].speaker;
        let text = conversation[index].text;

        if (speaker === "Hitler") {
            hitlerDialogue.innerHTML = text;
            hitlerDialogue.style.opacity = "1";
            jesusDialogue.style.opacity = "0";
        } else if (speaker === "Jesus") {
            jesusDialogue.innerHTML = text;
            jesusDialogue.style.opacity = "1";
            hitlerDialogue.style.opacity = "0";
        } else { // Both speaking
            hitlerDialogue.innerHTML = text;
            jesusDialogue.innerHTML = text;
            hitlerDialogue.style.opacity = "1";
            jesusDialogue.style.opacity = "1";
        }

        // If it's the last line, play wish.mp3 first before showing it
        if (index === conversation.length - 1) {
            wishAudio.currentTime = 0;
            wishAudio.play().then(() => {
                setTimeout(() => {
                    index++; // Move to next line
                    showNextDialogue(); // Display "Happy Birthday, Richa!"
                    setTimeout(startCredits, 5000); // Start credits after 5s
                }, 2000); // Delay showing text while wish.mp3 starts playing
            }).catch(err => console.log("🔇 Audio play error:", err));
        } else {
            index++;
            setTimeout(showNextDialogue, 3000); // Continue dialogue normally
        }
    }
}

function startCredits() {
    // Fade out dialogues
    hitlerDialogue.style.opacity = "0";
    jesusDialogue.style.opacity = "0";

    // Start background music
    birthdayAudio.currentTime = 0;
    birthdayAudio.play().catch(err => console.log("🔇 Audio play error:", err));

    // Start rolling credits
    creditsDiv.style.opacity = "1";
    creditsDiv.style.animation = "rollCredits 60s linear forwards"; // Slow scrolling
}

// Start dialogue sequence
setTimeout(showNextDialogue, 3000);
