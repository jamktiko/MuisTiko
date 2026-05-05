<script>
	// propsit tuleville jutuille
	let { card, imgCover, handleChoice, flipped, disabled } = $props();
	import { gameState } from '$lib/state/gameState.svelte';

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	const isRevealed = $derived(
		flipped || card.matched || gameState.boosterShowTwoCards.includes(card.id)
	);
</script>

<div class="card">
	<div class="card" class:flipped={isRevealed}>
		<img src={card.src} class="front" alt="card front" />
		<button class="back-btn" onclick={handleClick} aria-label="Flip card">
			<img src={imgCover} class="back" alt="card back" />
		</button>
	</div>
</div>
