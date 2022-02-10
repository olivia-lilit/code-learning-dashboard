<script>
function addProgressTracker(){
    let newProgressTracker= document.createElement("progress");
    newProgressTracker.style.display = "block"
    let button = document.querySelector("button");
    button.after(newProgressTracker);
    console.log("added!")
}

</script>

<button on:click={addProgressTracker}>Add Tracker</button>

<style>
    * {
        font-family: monospace;
    }


</style>
