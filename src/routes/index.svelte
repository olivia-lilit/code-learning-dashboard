<script>
    import "../globalStyles.css"
    import TrackersList from "../components/trackers.svelte"
    import { trackers } from "../stores"

    import HelloName from "../components/helloName.svelte"
    import { userName } from "../stores"

    import Settings from "../components/settings.svelte"

</script>

<HelloName bind:userName={$userName}/>

<Settings/>

<TrackersList bind:trackers={$trackers} /> 