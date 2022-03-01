<script>
	// creates the top level variable trackers for the component Trackers
	export let trackers;

	let newTrackerName;
	let newTrackerUrl;
	let newTrackerTotalModules;
	let newTrackerCompletedModules;
	let newTrackerId = '';

	// reactively creates new ID's for tracker objects
	$: {
		if (trackers.length === 0) {
			newTrackerId = 1;
		} else {
			newTrackerId = Math.max(...trackers.map((t) => t.id)) + 1;
		}
	}

	function addTracker() {
		// only proceed if name and total modules was put in
		if (newTrackerName === '' || newTrackerTotalModules === undefined) {
			return alert('Please include a name and total number of modules');
		}
		// check if a number was typed in for completed modules, if not, assign the value to zero
		newTrackerCompletedModules = newTrackerCompletedModules ?? 0;

		// create standard url = null when none was provided or the form was tabbed through
		if (newTrackerUrl === '' || newTrackerUrl === undefined) {
			newTrackerUrl = null;
		}
		// add new object at end of an array, using spread syntax instead of push to force reactivity cleanly
		trackers = [
			...trackers,
			{
				id: newTrackerId,
				name: newTrackerName,
				url: newTrackerUrl,
				totalModules: Number(newTrackerTotalModules),
				completedModules: Number(newTrackerCompletedModules)
			}
		];
		// resets all variables back to blank to await next form values
		newTrackerName = '';
		newTrackerUrl = '';
		newTrackerTotalModules = '';
		newTrackerCompletedModules = '';
		newTrackerId = '';

		// hide the form at the end
		let form = document.querySelector('#addTrackerForm');
		form.classList.add('hidden');
	}

	function cancelAddTracker() {
		// rehide the form
		let targetElement = document.querySelector('#addTrackerForm');
		targetElement.classList.add('hidden');
		// clear out contents of the form
		newTrackerName = '';
		newTrackerUrl = '';
		newTrackerTotalModules = '';
		newTrackerCompletedModules = '';
		newTrackerId = '';
	}

	let currentTrackerName;
	let currentTrackerUrl;
	let currentTrackerTotalModules;
	let currentTrackerCompletedModules;
	let currentTrackerId;

	function editTrackerToggle(tracker) {
		// hide any other edit forms (required due to the slightly odd way I did this- could be refactored to use event targets and create a new form when an edit button is pressed)
		let otherForms = document.querySelectorAll('form.editor');
		for (const otherForm of otherForms) {
			otherForm.classList.add('hidden');
		}
		// unhide edit form for selected element
		let form = document.querySelector(`#editTracker-${tracker.id}`);
		form.classList.remove('hidden');

		// write editable variables from tracker data (they are bound to inputs in the markup below)
		currentTrackerName = tracker.name;
		currentTrackerUrl = tracker.url;
		currentTrackerTotalModules = tracker.totalModules;
		currentTrackerCompletedModules = tracker.completedModules ?? 0;
		currentTrackerId = tracker.id;

		// update trackers array to current tracker values defined above (that are bound to editable inputs)
		trackers[trackers.indexOf(tracker)] = {
			id: currentTrackerId,
			name: currentTrackerName,
			url: currentTrackerUrl,
			totalModules: Number(currentTrackerTotalModules),
			completedModules: Number(currentTrackerCompletedModules ?? 0)
		};
		// force reactivity for local storage
		trackers = trackers;
	}
	function hideTrackerEditor(tracker) {
		let form = document.querySelector(`#editTracker-${tracker.id}`);
		form.classList.add('hidden');
	}

	function incrementModules(tracker) {
		// if the tracker is not complete
		if (tracker.completedModules < tracker.totalModules) {
			//increment completedModules for the given tracker by one
			tracker.completedModules += 1;
			// force reactivity and storage for the overall array
			trackers = trackers;
		}
		// otherwise alert that it is impossible
		else {
			alert("You've already completed this!");
		}
	}

	function deleteTracker(tracker) {
		// find index of current tracker in overall array
		let trackerIndex = trackers.indexOf(tracker);
		// removes that object from the array
		trackers.splice(trackerIndex, 1);
		// updates stored data by forcing reactivity
		trackers = trackers;
	}

	function showTrackerForm() {
		let form = document.querySelector('#addTrackerForm');
		form.classList.remove('hidden');
	}

	function showSettingsMenu() {
		let menu = document.querySelector('#settingsMenu');
		menu.classList.remove('hidden');
	}

	function hideSettingsMenu() {
		let menu = document.querySelector('#settingsMenu');
		menu.classList.add('hidden');
	}

	function changeTheme(event) {
		let className = event.target.id;
		let root = document.querySelector(':root');
		// remove any present class (will only ever have theme classes)
		root.classList.remove(...root.classList);
		// add theme class to document root
		root.classList.add(className);
	}
</script>

<div class="flexContainer">
	<div class="gridContainer trackers">
		{#each trackers as tracker (tracker.id)}
			<label for={tracker.id}>
				{#if tracker.url !== null}
					<a href={tracker.url} target="_blank">{tracker.name}</a>
				{:else}
					{tracker.name}
				{/if}
			</label>
			<div class="buttonContainer">
				<button class="incrementButton" on:click={incrementModules(tracker)}>+</button>
				<button class="editButton" on:click={editTrackerToggle(tracker)}>△</button>
			</div>

			<div class="progress-bar">
				<progress id={tracker.id} max={tracker.totalModules} value={tracker.completedModules} />
				<span class="progress-numbers">{tracker.completedModules}/{tracker.totalModules}</span>
			</div>
		{:else}
			<span class="whole-row">No trackers added</span>
		{/each}
	</div>

	<div class="optionsMenu flex">
		<button class="addTrackerButton" on:click={showTrackerForm}>Add Tracker</button>

		<button on:click={showSettingsMenu} id="settingsButton">Change Theme</button>
	</div>
	<div id="settingsMenu" class="hidden flex">
		<button id="purpleTheme" class="theme purpleTheme" on:click={changeTheme}>Default</button>
		<button id="greenTheme" class="theme greenTheme" on:click={changeTheme}>Verdant</button>
		<button id="blueTheme" class="theme blueTheme" on:click={changeTheme}>Rainy</button>
		<button id="pinkTheme" class="theme pinkTheme" on:click={changeTheme}>Floral</button>
		<button id="greyTheme" class="theme greyTheme" on:click={changeTheme}>Minimal</button>
		<button on:click={hideSettingsMenu}>Finish</button>
	</div>

	<form
		autocomplete="off"
		on:submit|preventDefault={addTracker}
		class="hidden flex"
		id="addTrackerForm"
	>
		<div>
			<label for="resourceName">Resource Name *</label>
			<input bind:value={newTrackerName} type="text" name="resourceName" id="resourceName" />
		</div>
		<div>
			<label for="resourceURL">Resource URL</label>
			<input bind:value={newTrackerUrl} type="url" name="resourceUrl" id="resourceUrl" />
		</div>

		<div>
			<label for="moduleTotal">Total # of Modules *</label>
			<input
				bind:value={newTrackerTotalModules}
				type="number"
				name="moduleTotal"
				id="moduleTotal"
			/>
		</div>

		<div>
			<label for="modulesCompleted"># of Modules Completed</label>
			<input
				bind:value={newTrackerCompletedModules}
				type="number"
				name="modulesCompleted"
				id="modulesCompleted"
			/>
		</div>

		<button type="submit">Add</button>
		<button on:click|preventDefault={cancelAddTracker}>Cancel</button>
	</form>

	{#each trackers as tracker (tracker.id)}
		<form autocomplete="off" class="hidden flex editor" id="editTracker-{tracker.id}">
			<div>
				<label for="resourceName">Resource Name *</label>
				<input bind:value={tracker.name} type="text" name="resourceName" id="resourceName" />
			</div>
			<div>
				<label for="resourceURL">Resource URL</label>
				<input bind:value={tracker.url} type="url" name="resourceUrl" id="resourceUrl" />
			</div>

			<div>
				<label for="moduleTotal">Total # of Modules *</label>
				<input
					bind:value={tracker.totalModules}
					type="number"
					name="moduleTotal"
					id="moduleTotal"
				/>
			</div>

			<div>
				<label for="modulesCompleted"># of Modules Completed</label>
				<input
					bind:value={tracker.completedModules}
					type="number"
					name="modulesCompleted"
					id="modulesCompleted"
				/>
			</div>

			<button on:click|preventDefault={hideTrackerEditor(tracker)}>Finish</button>
			<button class="deleteButton" on:click={deleteTracker(tracker)}>Delete</button>
		</form>
	{/each}
</div>

<style>
	progress {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: none;
		width: 100%;
		height: 3rem;
	}

	progress::-webkit-progress-bar {
		background-color: rgb(223, 223, 223);
	}

	progress::-webkit-progress-value {
		background-color: var(--progress-color, rgb(185, 181, 243));
	}

	progress::-moz-progress-bar {
		background-color: var(--progress-color, rgb(185, 181, 243));
	}

	div.flexContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0;
	}

	.trackers label {
		font-size: 1.2rem;
		text-align: center;
		line-height: 120%;
	}

	.progress-bar {
		position: relative;
		width: 100%;
	}
	.progress-numbers {
		position: absolute;
		left: 0.8rem;
		top: 1.1rem;
		color: var(--accent-color, rgb(69, 60, 148));
		font-weight: 300;
		font-size: 0.8rem;
	}

	.incrementButton,
	.editButton {
		font-size: 1.5rem;
		vertical-align: middle;
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	.gridContainer {
		display: grid;
		width: 100%;
		grid-template-columns: 0.2fr 0.15fr 1.3fr;
		column-gap: 15px;
		row-gap: 20px;
		justify-items: center;
		align-items: center;
		border: 2px solid var(--progress-color, rgb(185, 181, 243));
		border-radius: 1em;
		padding: 1rem 3rem 1rem 2rem;
		margin-bottom: 1rem;
	}

	.buttonContainer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 10px;
	}

	.whole-row {
		grid-column-start: span 4;
		text-align: center;
	}

	.addTrackerButton,
	form > button,
	.optionsMenu *,
	#settingsMenu * {
		padding: 0.5rem;
		border-radius: 0.5em;
		font-size: 0.8rem;
	}

	form,
	#settingsMenu {
		width: 100%;
		padding: 1rem;
		margin: 1rem 0;
		gap: 1.5rem;
		border: 2px solid var(--progress-color, rgb(185, 181, 243));
		border-radius: 1em;
		justify-content: space-evenly;
	}

	form * {
		vertical-align: middle;
	}

	input {
		width: 40%;
		height: 2rem;
	}

	.deleteButton:hover {
		background-color: firebrick;
		border-color: firebrick;
	}
	.optionsMenu {
		width: 100%;
		gap: 10%;
		justify-content: center;
	}

	button.theme {
		background-color: var(--progress-color);
		border-color: var(--accent-color);
		color: black;
	}

	button.theme:hover {
		background-color: var(--accent-color);
		border-color: var(--progress-color);
		color: white;
	}

	@media screen and (max-width: 600px) {
		progress {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			border: none;
			width: 100%;
			margin-bottom: 15px;
		}

		.gridContainer {
			display: grid;
			width: 100%;
			grid-template-columns: 1fr;
			justify-items: center;
			align-items: center;
			border: 2px solid var(--progress-color, rgb(185, 181, 243));
			border-radius: 1em;
			padding: 1rem;
			margin-bottom: 1rem;
			row-gap: 5px;
		}

		.trackers label {
			width: 100%;
			font-size: 1.2rem;
			text-align: center;
		}

		span.progress-numbers {
			display: none;
		}

		form {
			width: 100%;
			flex-wrap: wrap;
		}
		button {
			background-color: white;
			border: 2px solid var(--accent-color, rgb(69, 60, 148));
		}

		button:hover {
			color: unset;
			background-color: white;
			border: 2px solid var(--accent-color, rgb(69, 60, 148));
		}
	}
</style>
