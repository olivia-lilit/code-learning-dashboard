let newProgressTracker= document.createElement("progress");

function addProgressTracker() {
    document.body.append(newProgressTracker);
    console.log("added!")
}

let buttons = document.querySelectorAll("button");
console.log(buttons.length)
for (button of buttons) {
console.log(button.innerHTML);
button.addEventListener("click", addProgressTracker);

}




