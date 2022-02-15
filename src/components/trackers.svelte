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
    // add new object at end of an array, using this spread syntax instead of push to force reactivity cleanly
    if (newTrackerCompletedModules === undefined) {
        newTrackerCompletedModules = Number(0);
    }
    
    trackers = [...trackers, {id:newTrackerId, name:newTrackerName, url:newTrackerUrl, totalModules:newTrackerTotalModules, completedModules:newTrackerCompletedModules}]
    // resets all variables back to blank to await next form values
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
    trackers.splice(trackerIndex);
    // updates stored data by forcing reactivity
    trackers = trackers; 
}

</script>

<form autocomplete="off" on:submit|preventDefault={addTracker}>
    <label for="resourceName">Resource Name</label>
    <input bind:value={newTrackerName} type="text" name="resourceName" id="resourceName">
    
    <label for="resourceURL">Resource URL</label>
    <input bind:value={newTrackerUrl} type="url" name="resourceUrl" id="resourceUrl">
    
    <label for="moduleTotal">Total # of Modules</label>
    <input bind:value={newTrackerTotalModules} type="number" name="moduleTotal" id="moduleTotal">
    
    <label for="modulesCompleted"># of Modules Completed</label>
    <input bind:value={newTrackerCompletedModules} type="number" name="modulesCompleted" id="modulesCompleted">
    
    <button type="submit">Submit</button>
</form>



<ul>
    {#each trackers as tracker (tracker.id)}
    <li class="tracker"> 
        <label for="{tracker.id}"> <a href="{tracker.url}">{tracker.name}</a></label>
        <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"> </progress>
        <button on:click= {incrementModules(tracker)} >+1</button>
        <button on:click= {deleteTracker(tracker)}>X</button>
    
    </li>
    {:else}
    <li>No trackers added</li>
    {/each}

</ul>