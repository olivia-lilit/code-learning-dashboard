<script>
    import Trackers from "../components/trackers.svelte"
    let trackers = [ 
        {id:1, name:"Just Javascript", totalModules:10, completedModules:4}
    ];

</script>

<Trackers {trackers}/> 

