import { localStorageStore } from "@babichjacob/svelte-localstorage/svelte-kit";

// create a default storage constant
const initialTrackers= [];

// export the localStorage syncing array for trackers
export const trackers = localStorageStore("tracker-data", initialTrackers);

// stands to reason you can just repeat the above a few times for things like name, focus, bookmarks

const initialUserName = "{your name}"

export const userName = localStorageStore("user-name", initialUserName)