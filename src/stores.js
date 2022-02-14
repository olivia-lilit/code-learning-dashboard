import { writable } from "svelte/store"
import { localStore } from "./localStore" 

const initialTrackers= [
    {id:1, name:"Example", totalModules:10, completedModules:5},
]

export const trackers = localStore("learning-dash-svelte", initialTrackers);
