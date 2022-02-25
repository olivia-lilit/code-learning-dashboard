// use the Babich store template
import { localStorageStore } from '@babichjacob/svelte-localstorage/svelte-kit';

// create a default storage constant and export the syncing variable for trackers
const initialTrackers = [];
export const trackers = localStorageStore('tracker-data', initialTrackers);

// create a default storage constant and export the syncing variable for trackers
const initialUserName = '{your name}';
export const userName = localStorageStore('user-name', initialUserName);
