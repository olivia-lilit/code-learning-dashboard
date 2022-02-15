<script>
    // imports the tracker display and form and logic
    import TrackersList from "../components/trackers.svelte"

    import { trackers } from "../stores"
    // $trackers = []; this makes stored trackers = empty

</script>


<TrackersList bind:trackers={$trackers} /> 
