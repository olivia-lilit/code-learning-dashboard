<script>
    import Trackers from "../components/trackers.svelte"
    // let trackers = [];
    import { localStorageStore } from "@babichjacob/svelte-localstorage/svelte-kit"

    $: console.log(localStorageStore )

    import { trackers } from "../stores"
    $trackers = []; 
    $: console.log("trackers", trackers)

</script>


<Trackers bind:trackers={$trackers} /> 
