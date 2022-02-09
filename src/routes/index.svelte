<script>
    let name = "Leah";
    let focus = "Shooting really good"
    import ProgressBars from "./addProgressBar.svelte";
</script>

<header>
    <h1>Hello, {name}</h1>
    <h2>Today you're focusing on: {focus.toLowerCase()}</h2>
</header>
<ProgressBars/>

<style>
    *{
        font-family: monospace;
    }
</style>