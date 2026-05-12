<!-- Timerin alustus (R) -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		initTimer,
		stopTimer,
		startSimpleTimer,
		stopSimpleTimer
	} from '$lib/state/timerState.svelte';
	import { minutes, seconds, minutes_2, seconds_2 } from '$lib/state/timerState.svelte';
	import { gameState } from '$lib/state/gameState.svelte';

	if (gameState.timelimit !== 'Ei rajaa') {
		onMount(() => {
			initTimer();
		});
	} else {
		onMount(() => {
			startSimpleTimer();
		});
	}

	$effect(() => {
		if (gameState.gameStatus === 'won') {
			stopSimpleTimer();
			stopTimer();
		}
	});

	onDestroy(stopTimer);
</script>

{#if gameState.timelimit !== 'Ei rajaa'}
	<img src="/data/ikonit/ajastin.svg" alt="ajastin" class="timericon" />
	<h1 class="timerh1">
		{$minutes}:{$seconds.toString().padStart(2, '0')}
	</h1>
{:else}
	<img src="/data/ikonit/kello_ikoni_valkoinen.svg" alt="ajastin" class="timericon" />
	<h1 class="timerh1">
		{$minutes_2}:{$seconds_2.toString().padStart(2, '0')}
	</h1>
{/if}
