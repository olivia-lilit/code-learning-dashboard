<script>
    function showSettingsMenu(){
        let menu = document.querySelector("#settingsMenu");
        menu.classList.remove("hidden");
        let button = document.querySelector("#settingsButton")
        button.classList.add("hidden")
    }

    function hideSettingsMenu(){
        let menu = document.querySelector("#settingsMenu");
        menu.classList.add("hidden");
        let button = document.querySelector("#settingsButton")
        button.classList.remove("hidden")
    }

</script>

<button on:click={showSettingsMenu} id="settingsButton">Settings</button>
<div id="settingsMenu" class="hidden">
    <section id="themePicker">
        <button id="greenTheme" class="theme"></button>
        <button id="pinkTheme"class="theme"></button>
        <button id="greyTheme"class="theme"></button>
    </section>

    <section id="numbersToggle">
        numbers
    </section>

    <section id="percentsToggle">
        %%%
    </section>

    <button on:click={hideSettingsMenu}>Finish</button>
</div>

<style>
    button{
        padding: .5rem;
       border-radius: .5em;
       font-size: .8rem;
    }

    #settingsMenu {
        background-color: rgb(238, 238, 238);
        border-radius: 1em;
        padding: 2rem;
    } 

    @media screen and (max-width: 600px) {
        button {
            background-color: white;
            border: 2px solid var(--accent-color);
        }

        button:hover{
            color: unset;
            background-color: white;
            border: 2px solid var(--accent-color);
            }
}
</style>