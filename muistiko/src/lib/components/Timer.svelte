<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { initTimer, stopTimer } from '$lib/state/timerState.svelte';
	import { minutes, seconds } from '$lib/state/timerState.svelte';

	onMount(initTimer);
	onDestroy(stopTimer);
</script>

<h1>{$minutes}:{$seconds.toString().padStart(2, '0')}</h1>
