<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appSettings } from '$lib/state/appSettings';
	import { loadMusicFromStorage } from '$lib/localstorage/localstorage';
	import { soundState } from '$lib/state/soundState.svelte';

	let audio: HTMLAudioElement | null = null;
	let { children } = $props();
	$effect(() => {
		if (audio) {
			soundState.audioElement = audio;
		}
	});
	let music = $state('/data/music/music_for_video-waiting-music-116216.mp3');

	onMount(() => {
		const savedMusic = loadMusicFromStorage();
		if (savedMusic && audio) {
			audio.src = savedMusic;
			audio.load()
		}
		if (!soundState.muted) {
            audio?.play();
        }

		
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class:high-contrast={$appSettings.highContrast}>
	{@render children()}
</div>
<!-- svelte-ignore element_invalid_self_closing_tag -->
<audio bind:this={audio} src={music} loop />
