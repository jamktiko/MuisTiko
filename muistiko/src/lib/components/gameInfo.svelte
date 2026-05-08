<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from './Button.svelte';

	interface Props {
		closeInfo: () => void;
	}

	let { closeInfo }: Props = $props();
</script>

<Modal>
	{#snippet header()}
		<div class="header-content">
			<div class="title-box">
				<h1><strong>INFO</strong></h1>
			</div>
			<Button text="x" class="close-button" onclick={closeInfo} ariaLabel="Sulje" />
		</div>
	{/snippet}

	{#snippet content()}
		<div class="info-modal">
			<div class="info-section">
				<h3><strong>MuisTIKO:</strong></h3>
				<ul>
					<li>Muistipeli, jossa tavoitteena on löytää kaikki korttiparit.</li>
					<li>Suunnattu kaikille ketkä pitävät pulmapeleistä.</li>
					<li>Pelistä löytyy eri toimintoja ja eri teemoja sekä rentoa musiikkia.</li>
				</ul>
			</div>
			<div class="info-section">
				<h3><strong>Säännöt:</strong></h3>
				<ul>
					<li>Klikkaa kortteja löytääksesi parit</li>
					<li>Kun löydät parin, kortit jäävät näkyviin</li>
					<li>Peli päättyy kun kaikki parit on löydetty</li>
					<li>Yritä löytää kaikki parit mahdollisimman vähillä siirroilla</li>
				</ul>
			</div>
			<div class="info-section">
				<h3><strong>Toiminnot:</strong></h3>
				<ul>
					<li>
						<strong>Teema:</strong> 4 eri teemaa, joista voit valita mieluisan, musiikki vaihtuu teeman
						kanssa
					</li>
					<li><strong>Vaikeustaso:</strong> 4 eri korttimäärää, joista voit valita</li>
					<li><strong>Aikaraja:</strong> Voit vaikeuttaa peliä asettamalla aikarajan</li>
					<li><strong>Boosterit:</strong> 2 boosteria, jotka auttavat sinua pelissä</li>
				</ul>
			</div>
		</div>
	{/snippet}

	{#snippet footer()}
		<div class="modal-footer">
			<h3><strong>TEKIJÄT:</strong></h3>
			<ul>
				<li>Roni Huuskonen, Nora Virta, Bea Sudensalo, Ville Rossi</li>
			</ul>
		</div>
	{/snippet}
</Modal>
