

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "Days <span class=\"digit\">" + days + "</span> Hours <span class=\"digit\">" + hours + "</span> Minutes <span class=\"digit\">" + minutes; 
	$("#clock").html(result);

	var text = "THE WORLD JUST GOT LUCKIER SINCE ";
	$("#message-box").html(text);

}

document.addEventListener("DOMContentLoaded", () => {
    const dialogueBox = document.getElementById("character-dialogue");
    const treeElement = document.getElementById("tree"); // Assuming tree has an ID "tree"
    const dogoImage = document.createElement("img");
    dogoImage.src = "dogo.png";
    dogoImage.style.display = "none"; // Initially hidden
    dogoImage.style.width = "200px"; // Adjust as needed
    dogoImage.style.position = "absolute";
    dogoImage.style.top = "50%";
    dogoImage.style.left = "50%";
    dogoImage.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(dogoImage); // Add image to the page

    const dialogues = [
        "Here We are in a magical place, as you can see in the background.",
        "All you have to click on that red heart",
        "Now as you know the person who made this, doesn't know any design",
        "He copy-pasted this from GitHub",
        "And of course didn't know how to change it from heart to something else",
        "JUST PRESS IT ALREADYYYY",
        "You know if you don't press it, I'm just going to repeat myself?",
        "Here we go again!"
    ];

    let dialogueIndex = 0;
    let treeAppeared = false; // Flag to track if tree appeared

    function updateDialogue() {
        if (!treeAppeared) {
            dialogueBox.textContent = dialogues[dialogueIndex];
            dialogueIndex = (dialogueIndex + 1) % dialogues.length; // Loop back
        }
    }

    updateDialogue(); // Show first dialogue immediately
    const intervalId = setInterval(updateDialogue, 5000); // Continue dialogue every 5 seconds

    function checkTreeAppearance() {
		
		if (treeElement) {
			const treeStyle = window.getComputedStyle(treeElement);
			if (treeStyle.display !== "none" && !treeAppeared) {
				// Stop the dialogue loop
				clearInterval(intervalId);
				treeAppeared = true;
				dialogueBox.textContent = "Ooo you pressed";
				dogoImage.style.display = "block"; // Show the dog image
			}
		}
	}
	
	if (treeElement) {
		const treeObserver = new MutationObserver(checkTreeAppearance);
		treeObserver.observe(treeElement, { attributes: true, attributeFilter: ["style", "class"] });
	} else {
		console.error("treeElement is not found in the DOM");
	}
	// Run check manually in case it's already visible on load
	checkTreeAppearance();
	
    console.log("Character dialogue system initialized...");
});
