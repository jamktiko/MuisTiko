<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import { gameState, handlePlayAgain, startNewGame } from '$lib/state/gameState.svelte';
	import Rain from './Rain.svelte';

	let turns = $derived(gameState.turns);
</script>

<!-- Häviötilanteessa ilmestyvä modalikkuna (R) -->
<div data-theme={gameState.theme}>
	<div class="lose-modal">
		<Modal>
			{#snippet header()}
				<h1>Hävisit pelin!</h1>
				<p>git reset --hard -palataan alkuun</p>
			{/snippet}

			{#snippet content()}
				<Rain />
				<p>Aika loppui!</p>
				<p class="game-turns-score">Tehdyt siirrot: {turns}</p>
			{/snippet}

			{#snippet footer()}
				<Button
					text="Yritä uudestaan"
					class="modal-buttons"
					onclick={startNewGame}
					ariaLabel="Yritä uudestaan"
				/>
				<Button
					text="Uusi peli"
					class="modal-buttons"
					onclick={handlePlayAgain}
					ariaLabel="Uusi peli"
				/>
			{/snippet}
		</Modal>
	</div>
</div>

<style>
	h1 {
		font-size: 60px;
		font-family: 'Coustard', serif;
	}

	p {
		font-size: 20px;
		font-family: 'Coustard', serif;
	}

	.game-turns-score {
		font-family: 'Coustard', serif;
	}

	.lose-modal {
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
