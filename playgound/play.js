// let newProgressTracker= document.createElement("progress");

// function addProgressTracker() {
//     document.body.append(newProgressTracker);
//     console.log("added!")
// }

// let buttons = document.querySelectorAll("button");
// console.log(buttons.length)
// for (button of buttons) {
// console.log(button.innerHTML);
// button.addEventListener("click", addProgressTracker);

// }

let trackers = [];
let form = document.querySelector("form");

function newTracker() {
    trackers.push(
        {id: trackers.length+1, 
        resourceName: (form.elements[0].textContent)
        }
    );
    console.log(trackers);
    console.log((form.elements[0].value))
}

let buttons = document.querySelectorAll("button");
console.log(buttons.length)
for (button of buttons) {
button.addEventListener("click", newTracker);
}

