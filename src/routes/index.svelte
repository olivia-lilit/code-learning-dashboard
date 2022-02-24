<script>
    import "../globalStyles.css"
    import TrackersList from "../components/trackers.svelte"
    import { trackers } from "../stores"

    import HelloName from "../components/helloName.svelte"
    import { userName } from "../stores"


</script>

<HelloName bind:userName={$userName}/>


<TrackersList bind:trackers={$trackers} /> 
