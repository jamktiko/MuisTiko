<script>
	// propsit tuleville jutuille
	let { card, imgCover, handleChoice, flipped, disabled } = $props();

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};
</script>

<div class="card">
	<div class:flipped>
		<img src={card.src} class="front" alt="card front" />
		<button class="back-btn" onclick={handleClick} aria-label="Flip card">
			<img src={imgCover} class="back" alt="card back" />
		</button>
	</div>
</div>

<style>
	.card {
		position: relative;
	}

	.card :hover {
		cursor: pointer;
		transform: scale(1.05);
		size: 110%;
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
