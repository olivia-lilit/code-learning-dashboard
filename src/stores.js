import { writable } from "svelte/store"
import { localStore } from "./localStore" 

const initialTrackers= [];

export const trackers = localStore("learning-dash-svelte", initialTrackers);
