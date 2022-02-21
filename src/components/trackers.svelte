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

let currentTrackerName; 
let currentTrackerUrl;
let currentTrackerTotalModules;
let currentTrackerCompletedModules;
let currentTrackerId;

function editTrackerToggle(tracker) {
    let otherForms = document.querySelectorAll("form.editor");
    for (const otherForm of otherForms){
        otherForm.classList.add("hidden")
    }
    let form = document.getElementById(`edit-tracker-${tracker.id}`);
    console.log(form);
    form.classList.toggle("hidden");
    currentTrackerName = tracker.name ; 
    currentTrackerUrl = tracker.url;
    currentTrackerTotalModules = tracker.totalModules;
    currentTrackerCompletedModules = tracker.completedModules;
    currentTrackerId = tracker.id;
    trackers[trackers.indexOf(tracker)] = {id:currentTrackerId, name:currentTrackerName, url:currentTrackerUrl, totalModules:Number(currentTrackerTotalModules), completedModules:Number(currentTrackerCompletedModules)};
    trackers=trackers;
}
function hideTrackerEditor(tracker) {
    let form = document.getElementById(`edit-tracker-${tracker.id}`);
    form.classList.add("hidden");
}



function incrementModules(tracker){
    if (tracker.completedModules < tracker.totalModules){
        //increment completedModules for the given tracker by one
        tracker.completedModules +=1;
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

function showTrackerForm() {
    let form = document.getElementById("add-tracker-form");
    form.classList.remove("hidden");
    }

</script>
<!-- 
<div class="flex-container">
    <div class="grid-container trackers">
            {#each trackers as tracker (tracker.id)}
                <label for="{tracker.id}"> 
                {#if tracker.url !== null}
                    <a href="{tracker.url}" target="_blank">{tracker.name}</a>
                {:else}
                    {tracker.name} 
                {/if}
                </label>
                <button class="increment-button" on:click= {incrementModules(tracker)} >+</button>
                <div class="progress-bar">
                    <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"></progress>
                    <span class="progress-numbers">{tracker.completedModules}/{tracker.totalModules}</span>
                </div>
                <button class="edit-button" on:click= {editTrackerToggle(tracker)}>△</button>
                <button class="delete-button" on:click= {deleteTracker(tracker)}>+</button>
            {:else}
                <span class="whole-row">No trackers added</span>
            {/each}
    </div>
</div> -->

<!-- fuck around and find out version BELOW - goal is to make it display as before for web/tablet and as drawn out for mobile-->

<div class="flex-container">
    <div class="grid-container trackers">
        {#each trackers as tracker (tracker.id)}
                <label for="{tracker.id}">
                {#if tracker.url !== null}
                    <a href="{tracker.url}" target="_blank">{tracker.name}</a>
                {:else}
                    {tracker.name}
                {/if}
                </label>
                <div class="button-container">
                    <button class="increment-button" on:click= {incrementModules(tracker)} >+</button>
                    <button class="edit-button" on:click= {editTrackerToggle(tracker)}>△</button>
                </div>

            <div class="progress-bar">
                <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"></progress>
                <span class="progress-numbers">{tracker.completedModules}/{tracker.totalModules}</span>
            </div>



        {:else}
            <span class="whole-row">No trackers added</span>
        {/each}
</div>
    
    <button class="add-tracker-button" on:click={showTrackerForm}>Add Tracker</button>
    
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

        <button type="submit">Add</button>
        <button on:click|preventDefault={cancelAddTracker}>Cancel</button>
    
    </form>

    {#each trackers as tracker (tracker.id)}
        <form autocomplete="off"  class="hidden flex editor" id="edit-tracker-{tracker.id}">
            <div>
                <label for="resourceName">Resource Name *</label>
                <input bind:value={tracker.name} type="text" name="resourceName" id="resourceName">
            </div>
            <div>
                <label for="resourceURL">Resource URL</label>
                <input bind:value={tracker.url} type="url" name="resourceUrl" id="resourceUrl">
            </div>
        
            <div>
                <label for="moduleTotal">Total # of Modules *</label>
                <input bind:value={tracker.totalModules} type="number" name="moduleTotal" id="moduleTotal">
            </div>

            <div>
                <label for="modulesCompleted"># of Modules Completed</label>
                <input bind:value={tracker.completedModules} type="number" name="modulesCompleted" id="modulesCompleted">
            </div>

            <button on:click={hideTrackerEditor(tracker)}>Finish</button>
            <button class="delete-button" on:click= {deleteTracker(tracker)}>Delete</button>
        </form>
    {/each}
</div>


<style>
    progress {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        width: 100%;
       height: 3rem;
        }

    progress::-webkit-progress-bar {
        background-color: rgb(223, 223, 223);
    }

   progress::-webkit-progress-value {
       background-color: var(--progress-color);
   }

   progress::-moz-progress-bar {
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
       text-align: center;
       line-height: 120%;
   }

   .progress-bar {
    position:relative;
    width:100%;

   }
   .progress-numbers {
       position: absolute;
       left: .8rem;
       top:1.1rem;
       color: var(--accent-color);
       font-weight: 300;
       font-size: .8rem;

   }

    .increment-button,.edit-button {
        font-size: 1.5rem;
        vertical-align:middle;
        border-radius: 50%;
        width: 40px;
        height: 40px;
   }
   .grid-container {
        display: grid;
        width: 100%;
        grid-template-columns: .2fr .15fr 1.3fr;
        column-gap: 15px;
        row-gap: 20px;
        justify-items: center;
        align-items: center;
        border: 2px solid var(--progress-color);
        border-radius: 1em;
        padding: 1rem 3rem 1rem 2rem;
        margin-bottom: 1rem;
   }

   .button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;

        /* width: 100%; */

   }
   .whole-row {
       grid-column-start: span 4;
       text-align: center;
   }

   .add-tracker-button, form>button {
       padding: .5rem;
       border-radius: .5em;
       font-size: .8rem;
   }

   form {
        padding: 1rem;
        margin: 1rem 0;
        gap: 1.5rem;
        border: 2px solid var(--progress-color);
        border-radius: 1em;


   }
   form * {
       vertical-align: middle;
   }

   input {
       width: 40%;
        height: 2rem;
   }

   .delete-button:hover {
       background-color: firebrick;
       border-color: firebrick;
   }

   @media screen and (max-width: 600px){
   
        progress {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        width: 100%;
       height: 1.75rem;
       margin-bottom: 15px;
        }
    
        .grid-container {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr;
        justify-items: center;
        align-items: center;
        border: 2px solid var(--progress-color);
        border-radius: 1em;
        padding: 1rem;
        margin-bottom: 1rem;
        row-gap: 5px;
        }

        .trackers label{
            width: 100%;
            font-size: 1.2rem;
            text-align: center;
        }

        /* .increment-button, .edit-button {
            font-size: 1.5rem;
            width: 30px;
            height: 30px;
        } */

        span.progress-numbers {
            display: none;
        }

        form {
            width: 100%;
            flex-wrap: wrap;
        }
        button {
            background-color: white;
            border: 2px solid var(--accent-color);
        }

        button:hover{
            color: unset;
            background-color: white;
            border: 2px solid var(--accent-color);
            }
        }

</style>

