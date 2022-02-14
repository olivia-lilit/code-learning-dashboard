import { browser } from "$app/env";
// import { localStorageStore as base } from"/Users/oliviarudd/Repos/learning-dash/node_modules/@babichjacob/svelte-localstorage/base.js"

import { writable } from 'svelte/store';


// /**
//  * @template Item
//  * @param {string} key What key in localStorage to synchronize with
//  * @param {Item} initial The initial value of the writable store
//  * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes to localStorage
//  */
//  export const localStorageStore = (key, initial) => base(key, initial, browser);

// export const localStore = (key, initial) => {                 
    // receives the key of the local storage and an initial value
  if (browser) {
  const toString = (value) => JSON.stringify(value, null, 2);  
  // helper function
  // const toObj = JSON.parse();

  const toObj = (value) =>JSON.parse(value);
  // helper function

  if (localStorage.getItem(key) === null) {                   
      // item not present in local storage
    localStorage.setItem(key, toString(initial))              
    // initialize local storage with initial value
  }

  const saved = toObj(localStorage.getItem(key))             
   // convert to object

  const { subscribe, set, update } = writable(saved)          
  // create the underlying writable store

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, toString(value))              
      // save also to local storage as a string
      return set(value)
    },
    update
  }
}