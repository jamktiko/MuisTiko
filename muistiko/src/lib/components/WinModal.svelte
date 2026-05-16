<!-- Komponentti voittomodaalille ja sen sisällöille (B)-->
<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import { gameState, handlePlayAgain, startNewGame } from '$lib/state/gameState.svelte';
	import { minutes_2, seconds_2, usedMinutes, usedSeconds } from '$lib/state/timerState.svelte';
	import { confetti } from '@neoconfetti/svelte';
</script>

<div data-theme={gameState.theme}>
	<!-- Voittomodaali -->
	<div class="win-modal">
		<!-- Confetti-komponentti ladattu npm-pakettina (R)-->
		<div class="confetti-container" use:confetti={{ particleCount: 500, force: 0.5 }}></div>
		<!--Modal-komponentti, joka sisältää headerin, contentin ja footerin (B)-->
		<Modal>
			{#snippet header()}
				<h1>VOITIT PELIN!</h1>
				<p>git commit - m “Muisti tallessa”</p>
				<br />
			{/snippet}

			{#snippet content()}
				{#if gameState.timelimit !== 'Ei rajaa'}
					<p>Aikaa kului: {$usedMinutes}:{$usedSeconds.toString().padStart(2, '0')}</p>
				{:else}
					<p class="game-timer-score">
						Aikaa kului: {$minutes_2}:{$seconds_2.toString().padStart(2, '0')}
					</p>
				{/if}
				<p class="game-turns-score">Tehdyt siirrot: {gameState.turns}</p>
			{/snippet}

			{#snippet footer()}
				<Button
					text="Pelaa uudestaan"
					class="modal-buttons"
					onclick={startNewGame}
					ariaLabel="Pelaa uudestaan"
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

	.game-timer-score {
		font-family: 'Coustard', serif;
	}

	.game-turns-score {
		font-family: 'Coustard', serif;
	}

	.win-modal {
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.confetti-container {
		position: absolute;
		top: 10%;
		left: 50%;
		height: 100%;
		pointer-events: none;
	}
</style>
