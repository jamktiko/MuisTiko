<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';

	interface Props {
		closeInfo: () => void;
	}

	let { closeInfo }: Props = $props();
</script>

<Modal>
	{#snippet header()}
	<div class="header-content">
		<h1><strong>INFO</strong></h1>
		<div class="close-button">
		<Button  onclick={closeInfo} text="×"/>
		</div>
	</div>
	{/snippet}
   
	{#snippet content()}
	<p><strong>MuisTiko</strong> on muistipeli, jossa tavoitteena on löytää kaikki korttiparit.</p>
	<h3><strong>Säännöt:</strong></h3>
		<ul>
			<li>Klikkaa kortteja löytääksesi parit</li>
			<li>Kun löydät parin, kortit jäävät näkyviin</li>
		  <li>Peli päättyy kun kaikki parit on löydetty</li>
			<li>Yritä löytää kaikki parit mahdollisimman vähillä siirroilla</li>	
		</ul>

 <h3><strong>Toiminnot:</strong></h3>
	<ul>
		<li><strong>Teema:</strong> 4 eri teemaa, joista voit valita mieluisan, musiikki vaihtuu teeman kanssa.</li>
		<li><strong>Vaikeustaso:</strong> 4 eri vaikeustasoa mistä voit valita</li>
		<li><strong>Aikaraja:</strong> Voit vaikeuttaa peliä asettamalla aikarajan</li>
	</ul>
	{/snippet}

	{#snippet footer()}
		<p>hallootta</p>
	{/snippet}
</Modal>

<style>
	.close-button {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: inherit;
		padding: 0;
		margin: 0;
		
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>