<script>
    // imports the tracker display and form and logic
    import TrackersList from "../components/trackers.svelte"

    import { trackers } from "../stores"
    // $trackers = []; this makes stored trackers = empty

    import HelloName from "../components/helloName.svelte"

    import { userName } from "../stores"
</script>

<HelloName bind:userName={$userName}/>

<TrackersList bind:trackers={$trackers} /> 
