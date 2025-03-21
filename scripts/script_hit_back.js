// DOM Elements
const dialogueBox = document.getElementById("dialogue-box");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const cityContainer = document.getElementById("city-container");
const punishmentContainer = document.getElementById("punishment-container");

// Audio Elements
const eerieAudio = document.getElementById("eerie-audio"); // 🎵 Eerie background music
const spankAudio = document.getElementById("spank-audio");
const whipAudio = document.getElementById("whip-audio");
const screamAudio = document.getElementById("scream-audio");

let currentQuestionIndex = 0;

const questions = [
    {
        question: "What is the capital of the country that started World War 2?",
        options: ["London","Paris", "Rome","Berlin"],
        correct: 3,
        background: "photos/berlin.jpg",
        conquestMessage: "Correct! Now my tanks have secured Berlin, the heart of my empire!"
    },
    {
        question: "Which key city did the Germans take to bypass the Maginot Line?",
        options: ["Reims", "Metz", "Dunkirk", "Brussels"],
        correct: 1,
        background: "photos/metz.jpg",
        conquestMessage: "Correct! Metz has fallen, and now my tanks roll into France!"
    },

    {
        question: "Which city did Germany bomb relentlessly during the Blitz?",
        options: ["London","Edinburgh",  "Liverpool", "Manchester"],
        correct: 0,
        background: "photos/london.jpg",
        conquestMessage: "Correct! London is under relentless bombardment. Soon, Britain will kneel!"
    },
    {
        question: "Which North African city was a critical Axis stronghold?",
        options: ["Cairo", "Tunis", "Tobruk", "Algiers"],
        correct: 2,
        background: "photos/tobruk.jpg",
        conquestMessage: "Correct! Rommel’s Afrika Korps has taken Tobruk. The desert is mine!"
    },
    {
        question: "Which city was the first to be liberated by the Allies in 1944?",
        options: ["Rome", "Berlin", "Warsaw", "Paris"],
        correct: 3,
        background: "photos/paris.jpg",
        conquestMessage: "Correct! Paris belongs to the Reich! The Eiffel Tower is ours!"
    },
    {
        question: "Which is the cosiest place in all world?",
        options: ["Room 108 aka Dev's ROOM", "Room 604- SDS Lab", "Room 209- RICHA's room", "Washroom😏"],
        correct: 2,
        background: "photos/photo.jpeg",
        conquestMessage: "Hmmmm, well look for prakruthi!!"
    }
];


// Function to start eerie background music immediately when the page loads
document.addEventListener("DOMContentLoaded", function () {
    eerieAudio.play().catch(err => console.log("🔇 Autoplay blocked. Waiting for user interaction...", err));
});

function startQuiz() {
    dialogueBox.innerHTML = "Now you help me in world domination!";
    
    setTimeout(() => {
        dialogueBox.innerHTML = "Answer the questions!";
    }, 2000); // Delay second message by 2s
    setTimeout(() => {
        dialogueBox.innerHTML = "If you answer incorrectly jesus gets whipped!";
    }, 2000); // Delay second message by 2s
    setTimeout(() => {
        dialogueBox.style.display = "none";
        quizContainer.style.display = "block"; // ✅ Show the quiz container
        showQuestion();
    }, 4000); // Start quiz after 4s
}

// Function to display a question
function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex]; // ✅ Keep showing the same question
    quizContainer.style.display = "block"; // ✅ Ensure quiz is visible
    questionText.innerHTML = currentQuestion.question;
    optionsDiv.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        btn.classList.add("option-button");
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        punishmentContainer.style.display = "block";
        punishmentContainer.style.backgroundImage = `url('${currentQuestion.background}')`; 
        punishmentContainer.style.backgroundSize = "cover"; 
        punishmentContainer.style.backgroundPosition = "center";

        // ✅ Show correct answer message
        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = currentQuestion.conquestMessage;

        setTimeout(() => {
            punishmentContainer.style.display = "none"; 
            dialogueBox.style.display = "none";
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                showQuestion(); // ✅ Continue quiz normally
            } else {
                askFinalQuestion(); // ✅ Instead of ending, ask "Did you receive it?"
            }
        }, 2500);
    } else {
        // ❌ Wrong answer logic
        eerieAudio.pause();
        spankAudio.play();
        setTimeout(() => { whipAudio.play(); }, 500);
        setTimeout(() => { screamAudio.play(); }, 1000);

        // ✅ Show punishment image
        punishmentContainer.style.display = "block";
        punishmentContainer.style.backgroundImage = `url('photos/punish.jpg')`; 
        punishmentContainer.style.backgroundSize = "cover"; 
        punishmentContainer.style.backgroundPosition = "center";

        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = "Pff! You answered wrongly. Jesus gets a spanking!";

        setTimeout(() => {
            punishmentContainer.style.display = "none"; // ✅ Hide punishment image after 2 sec
            dialogueBox.style.display = "none";
            eerieAudio.play().catch(err => console.log("🔇 Failed to resume eerie music", err)); // ✅ Resume eerie music after punishment
            showQuestion(); // ✅ Keeps the same question until correct
        }, 2000);
    }
}
// ✅ Function to ask "Did you receive it?"
// ✅ Function to ask "Did you receive it?"
function askFinalQuestion() {
    // ✅ Hide question text so only "Did you receive it?" appears
    questionText.innerHTML = "";
    optionsDiv.innerHTML = ""; // Clear previous buttons

    // ✅ Show Hitler's final dialogue
    dialogueBox.style.display = "block";
    dialogueBox.innerHTML = "Did you receive it?";

    // ✅ Create Yes button
    const yesButton = document.createElement("button");
    yesButton.innerText = "Yes";
    yesButton.classList.add("option-button");
    yesButton.onclick = () => {
        eerieAudio.pause(); // Stop background music when leaving
        window.location.href = "credits.html"; // ✅ Redirect to credits
    };

    // ✅ Create No button
    const noButton = document.createElement("button");
    noButton.innerText = "No";
    noButton.classList.add("option-button");
    noButton.onclick = () => {
        dialogueBox.innerHTML = "Search for Prakruthi na!"; // ❌ No looping anymore
        noButton.disabled = true; // ✅ Disable No button to prevent infinite loops
    };

    optionsDiv.appendChild(yesButton);
    optionsDiv.appendChild(noButton);
}


// Function to end the game and redirect
function endGame() {
    dialogueBox.style.display = "block";
    dialogueBox.innerHTML = "You have finished the test... for now.";

    setTimeout(() => {
        window.location.href = "hit_back.html"; // ✅ Redirect after 20 seconds
    }, 20000);
}

// Start Hitler's dialogue and then quiz
setTimeout(startQuiz, 5000);
