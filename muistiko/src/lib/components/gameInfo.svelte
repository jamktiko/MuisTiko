<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

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
			<button class="close-button" onclick={closeInfo} aria-label="Sulje">×</button>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="info-modal">
			<div class="info-section">
				<h3><strong>Pelin asetukset</strong></h3>
				<ul>
					<li>
						<strong>Teema:</strong>
						Pelissä on neljä eri teemaa. Teeman valinta muuttaa pelikorttien ulkoasua, taustaa sekä pelin
						aikana soivaa musiikkia.
					</li>
					<li>
						<strong>Aikaraja:</strong>
						Voit haastaa itsesi valitsemalla aikarajan (1, 2 tai 3 minuuttia). Peli päättyy, jos aika
						loppuu ennen kuin kaikki parit on löydetty. Voit myös pelata ilman aikarajaa.
					</li>
				</ul>
			</div>

			<div class="info-section">
				<h3><strong>Pelin kulku</strong></h3>
				<ul>
					<li>
						<strong>Korttien kääntäminen:</strong>Käännä kaksi korttia kerrallaan klikkaamalla
						niitä.
					</li>
					<li>
						<strong>Pari:</strong>Jos kortit ovat samanlaiset, ne jäävät näkyviin.
					</li>

					<li>
						<strong>Kääntölaskuri:</strong>Peli laskee jokaisen parin "käännön". Yksi kääntö
						tarkoittaa kahden kortin kääntämistä, riippumatta siitä, löytyykö pari vai ei. Mitä
						pienempi kääntömäärä pelin lopussa on, sitä parempi suorituksesi oli!
					</li>
				</ul>
			</div>

			<div class="info-section">
				<h3><strong>Lisäavut peliin:</strong></h3>
				<ul>
					<li>
						<strong>Boosterit:</strong>Käytössäsi on kertakäyttöisiä Booster-nappeja, jotka auttavat
						sinua tiukoissa tilanteissa. Käytä ne viisaasti, sillä kunkin voi aktivoida vain kerran
						pelin aikana!
					</li>
				</ul>
			</div>
		</div>
	{/snippet}

	{#snippet footer()}
		<div class="modal-footer">
			<ul>
				<li>
					Nora Virta (UI ja suunnittelu), Roni Huuskonen, Bea Sudensalo ja Ville Rossi (Frontend)
				</li>
				<li></li>
			</ul>
		</div>
	{/snippet}
</Modal>
