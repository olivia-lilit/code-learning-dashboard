<script>
    let name = "Leah";
    let focus = "Shooting really good"
    import ProgressBar from "./addProgressBar.svelte";
    // import ProgressBarArray from "./progressBarArray.svelte";
    let trackers = [];
    const form = document.querySelector("form");

    function newTracker() {

        trackers.push(
            {id: trackers.length+1, 
            resourceName: (form.elements[0].textContent)
            }
        );
        console.log(trackers);
    }


</script>

<header class="flex-parent">
    <h1>Hello, {name}</h1>
    <h2>Today you're focusing on: {focus.toLowerCase()}</h2>
</header>
<section class="flex-parent">
    <ProgressBar/>

</section>

<form>
    <label for="resourceName">Resource Name</label>
    <input type="text" name="resourceName" id="resourceName">
    
    <label for="resourceURL">Resource URL</label>
    <input type="text" name="resourceUrl" id="resourceUrl">
    
    <label for="moduleTotal">Total # of Modules</label>
    <input type="number" name="moduleTotal" id="moduleTotal">
    
    <label for="modulesCompleted"># of Modules Completed</label>
    <input type="number" name="modulesCompleted" id="modulesCompleted">
    
    <button on:click={newTracker}>Submit</button>
</form>



<style>
    *{
        font-family: monospace;
    }
</style>