<script>
    export let userName; 

    function toggleEditor(){
        let nameField = document.getElementById("change-name");
        nameField.classList.toggle("hidden-name");
    }
</script>

<h1> Hello, <span id="name" on:click={toggleEditor}>{userName}</span> </h1>
<div id="change-name" class="hidden-name">
    <input type="text" bind:value= {userName}> 
    <button on:click={toggleEditor}>Done</button>
</div>



<style>
    *{
        font-family: monospace;
    }

    .hidden-name {
        display: none;
    }

    #name {
        border: 2px solid grey;
        border-radius: .5rem;
        background-color: rgb(238, 238, 238);
        padding: 1%;
    }
</style>