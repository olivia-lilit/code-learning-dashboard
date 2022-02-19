<script>
// creates the top level variable trackers for the component Trackers
export let trackers;

let newTrackerName; 
let newTrackerUrl
let newTrackerTotalModules;
let newTrackerCompletedModules;
let newTrackerId= "";

// reactively creates new ID's for tracker objects. could be nested within the addTracker function and not reactive though
$: {
    //if there are no trackers, start id at one
    if (trackers.length === 0){
        newTrackerId = 1;
    }
    // if there are some trackers, find the highest id currently in the array and then add one to it. this is to allow deleting and adding of new objects freely in the array (as opposed to eg array.length as new id)
    else {
        newTrackerId = Math.max(...trackers.map(t => t.id)) + 1;
    }
}

function addTracker() {
    // only proceed if name and total modules was put in
    if ((newTrackerName === "") || (newTrackerTotalModules === undefined)){
         return alert("Please include a name and total number of modules");
    }
    // check if a number was typed in for completed modules, if not assign the value to zero as default
    if (newTrackerCompletedModules === undefined) {
        newTrackerCompletedModules = Number(0);
    }
    // create standard url = null when none was provided or the form was tabbed through
    if(newTrackerUrl === "" || newTrackerUrl === undefined) {
        newTrackerUrl = null;
    }
    // add new object at end of an array, using this spread syntax instead of push to force reactivity cleanly
    trackers = [...trackers, {id:newTrackerId, name:newTrackerName, url:newTrackerUrl, totalModules:Number(newTrackerTotalModules), completedModules:Number(newTrackerCompletedModules)}]
    // resets all variables back to blank to await next form values
    newTrackerName = "";
    newTrackerUrl = "";
    newTrackerTotalModules="";
    newTrackerCompletedModules="";
    newTrackerId="";

    let form = document.getElementById("add-tracker-form");
    form.classList.add("hidden")

}

function cancelAddTracker() {
    let targetElement = document.getElementById("add-tracker-form");
    targetElement.classList.add("hidden");
    newTrackerName = "";
    newTrackerUrl = "";
    newTrackerTotalModules="";
    newTrackerCompletedModules="";
    newTrackerId="";
}

function incrementModules(tracker){
    if (tracker.completedModules < tracker.totalModules){
        //increment completedModules for the given tracker by one
        tracker.completedModules +=1;
        console.log(typeof tracker.completedModules)
        // force reactivity and storage for the overall array
        trackers = trackers;
    }
    else {
        alert("You've already completed this!")
    }
}

function deleteTracker(tracker) {
    // find index of current tracker in overall array
    let trackerIndex = trackers.indexOf(tracker);
    // removes that object from the array
    trackers.splice(trackerIndex,1);
    // updates stored data by forcing reactivity
    trackers = trackers; 
}

function toggleTrackerForm() {
    let form = document.getElementById("add-tracker-form");
    form.classList.toggle("hidden")
    }

</script>

<div class="flex-container">
    <div class="grid-container trackers">
            {#each trackers as tracker (tracker.id)}
                {#if tracker.url === null}
                        <label for="{tracker.id}">{tracker.name}</label>
                        <button class="increment-button" on:click= {incrementModules(tracker)} >+</button>
                        <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"> </progress>
                        <button class="delete-button" on:click= {deleteTracker(tracker)}>+</button>
                {:else}
                        <label for="{tracker.id}"><a href="{tracker.url}">{tracker.name}</a></label>
                        <button class="increment-button" on:click= {incrementModules(tracker)} >+</button>
                        <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"> </progress>
                        <button class="delete-button" on:click= {deleteTracker(tracker)}>+</button>
                {/if}
            {:else}
                <li>No trackers added</li>
            {/each}
    </div>
    
    <button class="add-tracker-button" on:click={toggleTrackerForm}>Add Tracker</button>
    
    <form autocomplete="off" on:submit|preventDefault={addTracker} class="hidden flex" id="add-tracker-form">
        <div>
            <label for="resourceName">Resource Name *</label>
            <input bind:value={newTrackerName} type="text" name="resourceName" id="resourceName">
        </div>
        <div>
            <label for="resourceURL">Resource URL</label>
            <input bind:value={newTrackerUrl} type="url" name="resourceUrl" id="resourceUrl">
        </div>
    
        <div>
            <label for="moduleTotal">Total # of Modules *</label>
            <input bind:value={newTrackerTotalModules} type="number" name="moduleTotal" id="moduleTotal">
        </div>

        <div>
            <label for="modulesCompleted"># of Modules Completed</label>
            <input bind:value={newTrackerCompletedModules} type="number" name="modulesCompleted" id="modulesCompleted">
        </div>

        <button type="submit">Submit</button>
        <button on:click|preventDefault={cancelAddTracker}>Cancel</button>
    
    </form>
</div>


<style>
    progress {
        /* Reset the default appearance */
        -webkit-appearance: none;
        -moz-appearance: none;
                appearance: none;
        
        /* Get rid of default border in Firefox. */
        border: none;
       height: 2rem;
       justify-self: stretch;
    }
      progress::-webkit-progress-bar {
        /* sets whole bar - no moz equivalent */
        background-color: rgb(223, 223, 223);
    }

   progress::-webkit-progress-value {
       /* sets just value bar */
       background-color: var(--progress-color);
   }

   progress::-moz-progress-bar {
       /* sets just value bar */
       background-color: var(--progress-color);
   }

   div.flex-container {
       display: flex;
       flex-direction: column;
       align-items: center;
       padding: 1rem 0;
   }

   .trackers label {
       font-size: 1.2rem;
   }

    .delete-button, .increment-button {
        font-size: 1.5rem;
        vertical-align:middle;
        border-radius: 50%;
        width: 40px;
        height: 40px;
   }

   .delete-button {
       transform: rotate(45deg);
   }
   .grid-container {
        display: grid;
        width: 100%;
        grid-template-columns: .4fr .1fr 1fr .1fr;
        column-gap: 20px;
        row-gap: 10px;
        justify-items: center;
        align-items: center;
        border: 2px solid var(--progress-color);
        border-radius: 1em;
        padding: 1rem;
        margin-bottom: 1rem;
   }

   .add-tracker-button, form>button {
       padding: .5rem;
       border-radius: .5em;
   }

   form {
       padding: 1rem 0;
       gap: 1.5rem;
   }

   input {
       width: 40%;
   }

</style>

