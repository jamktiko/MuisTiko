<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import { gameState, handlePlayAgain, startNewGame } from '$lib/state/gameState.svelte';
	let turns = $derived(gameState.turns);
</script>

<div class="win-modal">
	<Modal>
		{#snippet header()}
			<h1>Voitit pelin!</h1>
		{/snippet}

		{#snippet content()}
			<p>Aika loppui</p>
			<p>Tehdyt siirrot: {turns}</p>
		{/snippet}

		{#snippet footer()}
			<Button text="Aloita alusta" onclick={startNewGame} />
			<Button text="Uusi peli" onclick={handlePlayAgain} />
		{/snippet}
	</Modal>
</div>

<style>
	h1 {
		font-size: 60px;
	}

	p {
		font-size: 20px;
	}

	.win-modal {
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
</style>
