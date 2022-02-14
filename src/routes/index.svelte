<script>
    import Trackers from "../components/trackers.svelte"
    // let trackers = [];
    import { trackers } from "../stores"
    // $trackers = []; 
    $: console.log("trackers", trackers)

</script>


<Trackers bind:trackers={$trackers} /> 
