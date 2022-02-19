<script>
    export let userName; 

    function toggleEditor(){
        let nameField = document.getElementById("change-name");
        nameField.classList.toggle("hidden");
    }
</script>

<h1 class="flex"> Hello, <span id="name" on:click={toggleEditor}>{userName}</span> </h1>
<div id="change-name" class="hidden flex">
    <input type="text" bind:value= {userName}> 
    <button on:click={toggleEditor}>Done</button>
</div>



<style>

    #name {
        border: 2px solid grey;
        border-radius: .5rem;
        background-color: rgb(238, 238, 238);
        padding: 0 .5rem;

    }

    .flex {
        justify-content: center;
        align-items: center;
    }
</style>