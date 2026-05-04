<script>
	// propsit tuleville jutuille
	let { card, imgCover, handleChoice, flipped, disabled } = $props();
	import { gameState } from '$lib/state/gameState.svelte';

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	const isRevealed = $derived(flipped || card.matched || gameState.boosterCards.includes(card.id));
</script>

<div class="card">
	<div class="card" class:flipped={isRevealed}>
		<img src={card.src} class="front" alt="card front" />
		<button class="back-btn" onclick={handleClick} aria-label="Flip card">
			<img src={imgCover} class="back" alt="card back" />
		</button>
	</div>
</div>

<style>
	.card {
		position: relative;
		background-color: transparent;
	}

	.card :hover {
		cursor: pointer;
		transform: scale(1.01);
	}
	.back-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
		width: 100%;
	}
	.card img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		background-color: transparent;
	}

	/* korttien kuvapuoli */
	.card .front {
		transform: rotateY(90deg);
		position: absolute;
	}
	.flipped .front {
		transform: rotateY(0deg);
		transition-delay: 0.2s;
	}

	/** korttien takapuoli */
	.card .back {
		transition-delay: 0.2s;
	}
	.flipped .back {
		transform: rotateY(90deg);
		transition-delay: 0s;
	}
</style>
