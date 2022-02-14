import { writable } from "svelte/store"
import { localStore } from "./localStore" 
import { localStorageStore } from "@babichjacob/svelte-localstorage/svelte-kit";

const initialTrackers= [];

// export const trackers = localStore("learning-dash-svelte", initialTrackers);

// attempting above but using the babich 

export const trackers = localStorageStore("learning-dash-babich", initialTrackers);


