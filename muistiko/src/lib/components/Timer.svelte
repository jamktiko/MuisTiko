<script lang="ts">
	import { onMount } from 'svelte';
	import { gameState } from '$lib/state/gameState.svelte';
	import { remaining, minutes, seconds } from '$lib/state/timerState.svelte';

	let startTime: number;

	const getTimelimitSeconds = () => {
		const timelimit = gameState.timelimit;
		return timelimit ? Number(timelimit) * 60 : 0;
	};

	onMount(() => {
		const timeLimit = getTimelimitSeconds();
		remaining.set(timeLimit);
		startTime = Date.now();

		const interval = setInterval(() => {
			const elapsed = Math.floor((Date.now() - startTime) / 1000);

			const value = Math.max(timeLimit - elapsed, 0);
			remaining.set(value);

			if (value === 0) {
				clearInterval(interval);
				gameState.gameStatus = 'lost';
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<h1>Aikaa jäljellä: {$minutes}:{$seconds.toString().padStart(2, '0')}</h1>
