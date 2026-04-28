<script lang="ts">
	import { onMount } from 'svelte';
	import { gameState } from '$lib/state/gameState.svelte';

	let remaining = $state(0);
	let startTime: number;

	const getTimelimitSeconds = () => {
		const timelimit = gameState.timelimit;
		return timelimit ? Number(timelimit) * 60 : 0;
	};

	onMount(() => {
		const timeLimit = getTimelimitSeconds();
		remaining = timeLimit;
		startTime = Date.now();

		const interval = setInterval(() => {
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			remaining = Math.max(timeLimit - elapsed, 0);

			if (remaining === 0) {
				clearInterval(interval);
				// ✅ tähän voit lisätä esim. game over -logiikan
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	const minutes = $derived(Math.floor(remaining / 60));
	const seconds = $derived(remaining % 60);
</script>

<h1>Aikaa jäljellä: {minutes}:{seconds.toString().padStart(2, '0')}</h1>
