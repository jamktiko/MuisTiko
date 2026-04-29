<script>
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import { gameState } from '$lib/state/gameState.svelte';
	import { handlePlayAgain } from '$lib/state/gameState.svelte';
</script>

<Modal
	>{#snippet header()}
		<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
			<h1>Voitit pelin!</h1>
		</div>
	{/snippet}

	{#snippet content()}
		<p>Onneksi olkoon! Sait kaikki parit kerättyä.</p>
		<p>Käytit yhteensä <strong>{gameState.turns}</strong> siirtoa.</p>
		<div style="display: flex; gap: 1rem; justify-content: center;">
			<Button text="Pelaa uudelleen" onclick={handlePlayAgain} />
		</div>
	{/snippet}</Modal
>
