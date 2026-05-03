import type { Theme } from '$lib/state/gameState.svelte';

export function setThemeToStorage(item: string) {
	localStorage.setItem('theme', item.toString());
}

export function setTimelimitToStorage(item: string) {
	localStorage.setItem('timelimit', item.toString());
}

export function setDifficultyToStorage(item: string) {
	localStorage.setItem('difficulty', item.toString());
}

export function loadThemeFromStorage() {
	return localStorage.getItem('theme');
}

export function loadTimelimitFromStorage() {
	return localStorage.getItem('timelimit');
}

export function loadDifficultyFromStorage() {
	return localStorage.getItem('difficulty');
}

export function clearStorage() {
	localStorage.clear();
}
