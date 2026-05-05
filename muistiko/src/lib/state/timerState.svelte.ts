import { writable, derived } from 'svelte/store';
import { gameState } from '$lib/state/gameState.svelte';
import { browser } from '$app/environment';

export const elapsed = writable(0);
export const remaining = writable(0);
export const minutes = derived(remaining, (r) => Math.floor(r / 60));
export const seconds = derived(remaining, (r) => r % 60);
export const minutes_2 = derived(elapsed, (e) => Math.floor(e / 60));
export const seconds_2 = derived(elapsed, (e) => e % 60);
export const used = derived(remaining, (r) => Math.max(initialTimeLimit - r, 0));
export const usedMinutes = derived(used, (u) => Math.floor(u / 60));
export const usedSeconds = derived(used, (u) => u % 60);

let startTime = 0;
let interval: ReturnType<typeof setInterval> | null = null;
let initialTimeLimit = 0;
let simpleStartTime = 0;
let simpleInterval: ReturnType<typeof setInterval> | null = null;

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
	if (interval) return;
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

export function startSimpleTimer() {
	if (simpleInterval) return;

	simpleStartTime = Date.now();

	simpleInterval = setInterval(() => {
		elapsed.set(Math.floor((Date.now() - simpleStartTime) / 1000));
	}, 1000);
}

export function stopSimpleTimer() {
	if (simpleInterval) {
		clearInterval(simpleInterval);
		simpleInterval = null;
	}
}

export function resetSimpleTimer() {
	stopSimpleTimer();
	elapsed.set(0);
	startSimpleTimer();
}
