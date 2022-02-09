<script>
function addProgressTracker(){
    let newProgressTracker= document.createElement("progress");
    document.body.append(newProgressTracker);
    console.log("added!")
}
</script>

<button on:click={addProgressTracker}>Add Tracker</button>

<style>
    * {
        font-family: monospace;
    }

    progress{
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
            border: none;
    background-image:
      -moz-linear-gradient(
        top, 
        rgba(255, 255, 255, 0.25), 
        rgba(0, 0, 0, 0.25)
      ),
      -moz-linear-gradient(
        left, 
        rgb(76, 0, 255), 
        rgb(216, 0, 144)
      );
  
    border-radius: 2px; 
    background-size: 35px 20px, 100% 100%, 100% 100%; 
  }

  

  progress[value]::-moz-progress-bar { 
    background-image:
      -moz-linear-gradient(
        top, 
        rgba(255, 255, 255, 0.25), 
        rgba(0, 0, 0, 0.25)
      ),
      -moz-linear-gradient(
        left, 
        rgb(76, 0, 255), 
        rgb(216, 0, 144)
      );
  
    border-radius: 2px; 
    background-size: 35px 20px, 100% 100%, 100% 100%; 
  }
</style>