<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appSettings } from '$lib/state/appSettings';
	import SoundButton from '$lib/components/soundButton.svelte';
	import { soundState } from '$lib/state/soundState.svelte';
	let audio: HTMLAudioElement;
	let { children } = $props();
	$effect(() => {
		if (audio) {
			soundState.audioElement = audio;
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class:high-contrast={$appSettings.highContrast}>
	{@render children()}
</div>

<SoundButton />
