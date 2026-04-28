<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appSettings } from '$lib/state/appSettings';

	let { children } = $props();
	let highContrast = $appSettings.highContrast;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class:high-contrast={highContrast}>
	{@render children()}
</div>
