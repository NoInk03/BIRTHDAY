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
    { speaker: "Hitler & Jesus", text: "🎉 Happy Birthday, Richa! 🎉" }
];


let index = 0;
const hitlerDialogue = document.getElementById("hitler-dialogue");
const jesusDialogue = document.getElementById("jesus-dialogue");
const creditsDiv = document.getElementById("credits-container");
const birthdayAudio = new Audio("sounds/birthdaysong.mp3"); // 🎵 Load audio

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

        index++;
        setTimeout(showNextDialogue, 3000);
    } else {
        // 🎶 Start birthday music and credit roll AFTER conversation ends
        setTimeout(() => {
            hitlerDialogue.style.opacity = "0";
            jesusDialogue.style.opacity = "0";
            birthdayAudio.play().catch(err => console.log("🔇 Audio play error:", err)); // Try playing music

            creditsDiv.style.opacity = "1";
            creditsDiv.style.animation = "rollCredits 45s linear forwards"; // Slower speed (25s)
        }, 2000);
    }
}

setTimeout(showNextDialogue, 3000);
