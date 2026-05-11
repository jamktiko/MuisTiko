<script lang="ts">
	let { card, imgCover, handleChoice, flipped, disabled } = $props();
	import { gameState } from '$lib/state/gameState.svelte';

	// Määrittelee kortin käyttäytymisen ja ulkoasun. Kortti kääntyy, kun sitä klikataan. Käyttäjä voi klikata korttia vain, jos se ei ole jo käännetty tai pariksi löydetty.
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};
	// Määrittelee, milloin kortti näytetään etupuolelta. Kortti on näkyvissä, jos se on käännetty, pariksi löydetty tai jos pelin "boosterShowTwoCards" -tilassa oleva kortti on sama kuin tämä kortti.
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
