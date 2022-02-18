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
    console.log(targetElement);
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

function toggleHidden() {
    let targetElements = document.getElementsByClassName("hidden");
    for (const targetElement of targetElements){
        console.log(targetElement);
    targetElement.classList.toggle("hidden");
    }
}

</script>


<ul>
    {#each trackers as tracker (tracker.id)}
    <li class="tracker"> 
        <label for="{tracker.id}"><a href="{tracker.url}">{tracker.name}</a></label>
        <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"> </progress>
        <button on:click= {incrementModules(tracker)} >+1</button>
        <button on:click= {deleteTracker(tracker)}>X</button>
    
    </li>
    {:else}
    <li>No trackers added</li>
    {/each}

</ul>

<button on:click={toggleHidden}>Add Tracker</button>

<form autocomplete="off" on:submit|preventDefault={addTracker} class="hidden" id="add-tracker-form">
    <label for="resourceName">Resource Name</label>
    <input bind:value={newTrackerName} type="text" name="resourceName" id="resourceName">
    
    <label for="resourceURL">Resource URL</label>
    <input bind:value={newTrackerUrl} type="url" name="resourceUrl" id="resourceUrl">
    
    <label for="moduleTotal">Total # of Modules</label>
    <input bind:value={newTrackerTotalModules} type="number" name="moduleTotal" id="moduleTotal">
    
    <label for="modulesCompleted"># of Modules Completed</label>
    <input bind:value={newTrackerCompletedModules} type="number" name="modulesCompleted" id="modulesCompleted">
    
    <button type="submit">Submit</button>
    <button on:click|preventDefault={cancelAddTracker}>Cancel</button>

</form>

<style>
    * {
        font-family: monospace;
        --progress-color: rgb(173, 201, 162);
       /* --progress-color: rgb(175, 189, 272); */
        --accent-color: rgb(23, 92, 77);
    }
    progress {
        /* Reset the default appearance */
        -webkit-appearance: none;
        -moz-appearance: none;
                appearance: none;
        
        /* Get rid of default border in Firefox. */
        border: none;
        
        /* Dimensions */
        width: 50vw;
        height: 2vw;
    }

    progress::-webkit-progress-bar {
        /* sets whole bar - no moz equivalent */
        background-color: rgb(223, 223, 223);
    }

   progress::-webkit-progress-value {
       /* sets just value */
       background-color: var(--progress-color);
   }

   progress::-moz-progress-bar {
       background-color: var(--progress-color);
   }

   ul, form {
       padding: 0;
   }

   li {
       list-style-type: none;
   }

   button {
       background-color: white;
        border: 1px solid var(--accent-color);
        border-radius: 15%;
   }
   button:hover {
       background-color: var(--accent-color);
       color: white;
       border: 1px solid var(--progress-color);
   }

   a {
       /* text-decoration:var(--accent-color) wavy underline; */
   }

   a:visited {
       color: inherit;
   }

   .flex {
       display: flex;
   }

    .hidden {
       display: none;
   }


</style>

