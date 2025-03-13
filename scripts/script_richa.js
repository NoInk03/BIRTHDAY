// Global variables
const photoElement = document.getElementById("photo");
const dialogueBox = document.getElementById("dialogue-box");
const audio = document.getElementById("background-music");
const audioSource = document.getElementById("audio-source");
let dialogueIndex = 0;
let index = 0; // Slideshow index

// Function to play music
// Function to play music
function playMusic(src) {
    if (!src) return; // Avoid playing undefined audio

    audio.pause();         // Pause any currently playing music
    audio.currentTime = 0; // Reset playback position
    audioSource.src = src; // Update the source file
    audio.load();          // Reload the audio element
    audio.play().catch(err => console.log("Autoplay blocked:", err));
}


// Start Jesus' dialogues when page loads
document.addEventListener("DOMContentLoaded", function () {
    photoElement.style.display = "none"; // Hide photo initially
    playMusic("sounds/cute_2.mp3"); // Start default music
    showIntroDialogue(); // Start Jesus' dialogues
});

// Function to show Jesus' dialogues before slideshow
function showIntroDialogue() {
    const introDialogues = [
        "Now let's see the special lady",
        "The person whose hobby is",
        "DOODLINGGGGGGG!!",
        "Like WTF",
        "OMG I can't swear, I am GOD",
        "Anyways",
        "Here we go!" // This triggers the slideshow
    ];

    let i = 0;
    function showNextDialogue() {
        if (i < introDialogues.length) {
            dialogueBox.innerHTML = introDialogues[i];
            i++;
            setTimeout(showNextDialogue, 2500);
        } else {
            showNextPhoto(); // Start the slideshow
        }
    }
    showNextDialogue();
}

// Photo slideshow data
const photos = [
    { name: "C_first", dialogue: ["Ofc, How can we forget the 1st photo!"] },
    { name: "C_style", dialogue: ["You were born with a Photo Sense"] },
    { name: "C_fashion", dialogue: ["Little missy sits like she owns the world"] },
    { name: "C_stand", dialogue: ["Stand strong and firm, Soldier"] },
    { name: "C_photo", dialogue: ["Tu Kich meri photoooooo!"] },
    { name: "C_sleep", dialogue: ["You were born with a good photo sense", "Now it's non-existent!"] },
    { name: "C_smile", dialogue: ["That smile pffff!", "Okie, too much trolling now we get a good one!"] },
    { name: "C_mon", dialogue: ["Richa-monnnnn!!"] }
];

// Function to check which image format exists
function loadImage(photoName, callback) {
    const imageFormats = [".png", ".jpeg"];
    let imageFound = false;
    let loadedImage = null;

    imageFormats.forEach((format, i) => {
        let img = new Image();
        img.src = `photos/${photoName}${format}`;

        img.onload = function () {
            if (!imageFound) {
                imageFound = true;
                callback(img.src);
            }
        };

        img.onerror = function () {
            if (i === imageFormats.length - 1 && !imageFound) {
                console.error(`Image not found: ${photoName}.png or ${photoName}.jpeg`);
            }
        };
    });
}

function showNextPhoto() {
    if (index >= photos.length) {
        dialogueBox.innerHTML = "That's all, folks!";
        
        // Redirect to hit_back.html after 20 seconds
        setTimeout(() => {
            window.location.href = "hit_back.html";
        }, 20000); 
        
        return;
    }

    const currentPhoto = photos[index];

    loadImage(currentPhoto.name, (validSrc) => {
        photoElement.src = validSrc;
        photoElement.style.display = "block"; // Show photo

        let dialogueIndex = 0;
        function showDialogues() {
            if (dialogueIndex < currentPhoto.dialogue.length) {
                const currentDialogue = currentPhoto.dialogue[dialogueIndex];
                dialogueBox.innerHTML = currentDialogue;
                
                // 🔥 Play Doraemon music when Jesus says "Richa-monnnnn!!"
                if (currentDialogue === "Richa-monnnnn!!") {
                    console.log("🎵 Switching to Doraemon music...");
                    playMusic("sounds/Doraemon.mp3");
        
                    // ⏳ Redirect to hit_back.html after 5 seconds
                    setTimeout(() => {
                        window.location.href = "hit_back.html";
                    }, 25000);
                }
        
                dialogueIndex++;
                setTimeout(showDialogues, 2500);
            } else {
                // Keep last photo visible and stop hiding it
                if (index === photos.length - 1) {
                    dialogueBox.innerHTML = "Enjoy this moment!";
                    return; // Do not continue hiding and moving to the next photo
                }
        
                setTimeout(() => {
                    photoElement.style.display = "none";
                    dialogueBox.innerHTML = "";
                    index++;
                    
                    setTimeout(showNextPhoto, 1000);
                }, 2500);
            }
        }
        
        
        showDialogues();
    });
}
