import type { ThemeName } from './themeState.svelte';
import { getTheme } from './themeState.svelte';
import { setMusicToStorage } from '$lib/localstorage/localstorage';

export const soundState = $state({
	volume: 0.3,
	muted: true,
	showSlider: false,
	audioElement: null as HTMLAudioElement | null
});

export function changeMusic(theme: ThemeName) {
	const audio = soundState.audioElement;
	if (!audio) return;

	const themeMusic = getTheme(theme);
	if (!themeMusic) return;

	audio.pause();
	audio.src = themeMusic.music;
	audio.load();

	setMusicToStorage(themeMusic.music);

	if (!soundState.muted) {
		audio.play();
	}
}

export function toggleMute() {
	soundState.muted = !soundState.muted;
}

export function handleVolume(value: number) {
	soundState.volume = value;

	if (!soundState.muted && value > 0) {
		soundState.muted = false;
	} else if (value === 0) {
		soundState.muted = true;
	}
}

export function homePageMusic() {
	const audio = soundState.audioElement;
	if (!audio) return;
	audio.pause();
	audio.src = 'data/music/music_for_video-waiting-music-116216.mp3';
	audio.load();

	if (!soundState.muted) {
		audio.play();
	}
}
// Ääniefektit korteille käännettäessä (B)
export function playBlockSound() {
	if (soundState.muted) return; // Varmistetaan, että ääni ei toistu, jos mykistys on päällä
	const audio = new Audio('/data/sound_effects/asmarttv2022-block-1-328874.mp3');
	audio.volume = Math.min(soundState.volume * 1.5, 1);
	audio.play().catch(() => {}); // Estetään virheilmoitukset, jos ääni ei pysty toistumaan (esim. mobiililaitteiden autoplay-rajoitukset)
}
// Oikean parin ääni (B)
export function playCorrectSound() {
	if (soundState.muted) return; // Varmistetaan, että ääni ei toistu, jos mykistys on päällä
	const audio = new Audio('/data/sound_effects/dragon-studio-correct-472358.mp3');
	audio.volume = Math.min(soundState.volume * 0.6, 1);
	audio.play().catch(() => {}); // Estetään virheilmoitukset, jos ääni ei pysty toistumaan (esim. mobiililaitteiden autoplay-rajoitukset)
}
