import type { Theme } from '$lib/state/gameState.svelte';

// Hakee teeman datan json tiedostosta
export async function getThemeData(theme: Theme) {
	const response = await fetch(`/data/${theme}.json`);
	const json = await response.json();
	return json;
}

export function getImagePath(theme: Theme, imgSrc: string): string {
	const path = `/data/${theme}/${imgSrc}`;
	return path;
}
