import { writable, derived } from 'svelte/store';
import { gameState } from '$lib/state/gameState.svelte';
import { browser } from '$app/environment';

export const remaining = writable(0);
export const minutes = derived(remaining, (r) => Math.floor(r / 60));
export const seconds = derived(remaining, (r) => r % 60);

let startTime = 0;
let interval: ReturnType<typeof setInterval> | null = null;
let initialTimeLimit = 0;

const CONST_STORAGE_KEY = 'initialtimelimit';

const getTimelimitSeconds = () => {
	const timelimit = gameState.timelimit;
	return timelimit ? Number(timelimit) * 60 : 0;
};

export function initTimer() {
	if (!browser) return;

	const stored = localStorage.getItem(CONST_STORAGE_KEY);

	if (stored) {
		initialTimeLimit = Number(stored);
	} else {
		initialTimeLimit = getTimelimitSeconds();
		localStorage.setItem(CONST_STORAGE_KEY, String(initialTimeLimit));
	}
	remaining.set(initialTimeLimit);
	startTimer();
}

export function startTimer() {
	startTime = Date.now();

	interval = setInterval(() => {
		const elapsed = Math.floor((Date.now() - startTime) / 1000);
		const value = Math.max(initialTimeLimit - elapsed, 0);

		remaining.set(value);

		if (value === 0) {
			stopTimer();
			gameState.gameStatus = 'lost';
		}
	}, 1000);
}

export function resetTimer() {
	stopTimer();
	remaining.set(initialTimeLimit);
	startTimer();
}

export function stopTimer() {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
}

export function clearStoredTimer() {
	if (!browser) return;
	localStorage.removeItem(CONST_STORAGE_KEY);
}
