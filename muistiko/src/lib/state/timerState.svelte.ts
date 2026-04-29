import { writable, derived } from 'svelte/store';

export const remaining = writable(0);

export const minutes = derived(remaining, (r) => Math.floor(r / 60));

export const seconds = derived(remaining, (r) => r % 60);
