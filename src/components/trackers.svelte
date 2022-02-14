<script>
export let trackers;

let newTrackerName; 
let newTrackerTotalModules;
let newTrackerCompletedModules;
let newTrackerId= "";
// $: console.log(`length is ${trackers.length}`);
// $: console.log(`new id is ${newTrackerId}`);
$: console.log(trackers + "trackers.svelte here");

$: {
    if (trackers.length === 0){
        newTrackerId = 1;
    }
    else {
        newTrackerId = Math.max(...trackers.map(t => t.id)) + 1;
    }
}

function addTracker() {
    trackers = [...trackers, {id:newTrackerId, name:newTrackerName, totalModules:newTrackerTotalModules, completedModules:newTrackerCompletedModules}]
    newTrackerName = "";
    newTrackerTotalModules="";
    newTrackerCompletedModules="";
    newTrackerId="";

}

</script>

<form on:submit|preventDefault={addTracker}>
    <label for="resourceName">Resource Name</label>
    <input bind:value={newTrackerName} type="text" name="resourceName" id="resourceName">
    
    <!-- <label for="resourceURL">Resource URL</label>
    <input type="text" name="resourceUrl" id="resourceUrl"> -->
    
    <label for="moduleTotal">Total # of Modules</label>
    <input bind:value={newTrackerTotalModules} type="number" name="moduleTotal" id="moduleTotal">
    
    <label for="modulesCompleted"># of Modules Completed</label>
    <input bind:value={newTrackerCompletedModules} type="number" name="modulesCompleted" id="modulesCompleted">
    
    <button type="submit">Submit</button>
</form>



<ul>
    {#each trackers as tracker (tracker.id)}
    <li class="tracker"> 
        <label for="{tracker.id}">{tracker.name}</label>
        <progress id="{tracker.id}" max="{tracker.totalModules}" value="{tracker.completedModules}"> </progress>
    
    </li>
    {:else}
    <li>No trackers added</li>
    {/each}

</ul>
