<script>
    export let userName; 

    function toggleEditor(){
        let nameField = document.getElementById("change-name");
        nameField.classList.toggle("hidden");
    }
</script>

<h1 class="flex"> Hello,  <span id="name" on:click={toggleEditor}>{userName}</span> </h1>
<div id="change-name" class="hidden flex">
    <input type="text" bind:value= {userName}> 
    <button on:click={toggleEditor}>Done</button>
</div>



<style>
    h1 {
        font-size: 3rem;
        padding: 0;
        margin: 0;
    }
    #name {
        padding: .2rem .5rem 0 .5rem;
    }

    #name:hover {
        cursor: text;
        border-radius: .5rem;
        background-color: rgb(238, 238, 238);
    }

    .flex {
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    button {
        vertical-align:middle;
        border-radius: 50%;
        padding: .5rem;
        border-radius: .5em;
        margin: .5rem;
    }
    input {
        width:5rem;
        height: 2rem;
    }
</style>