<script lang="ts">
	import { onMount } from 'svelte';
	import SingleCard from '$lib/components/SingleCard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	// haetaan gameState ja kaikki muu (B)
	import {
		gameState,
		type Card,
		initalizeCards,
		resetCards,
		setTurns,
		setChoiceOne,
		setChoiceTwo,
		incrementTurns,
		turnOverCorrectPair
	} from '$lib/state/gameState.svelte';
	import { CARD_IMAGE_COVER_URL } from '$lib/constants';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Voidaan käyttää myöhemmin kun pitää lisätä muutakin teemaan kuin vain kortit (B)
	let theme = $derived(gameState.theme);

	const imgCover = CARD_IMAGE_COVER_URL;

	// Haetaan koko sovelluksen tila yhdestä paikasta (B)
	let cards = $derived(gameState.cards);
	let turns = $derived(gameState.turns);
	let choiceOne = $derived(gameState.choiceOne);
	let choiceTwo = $derived(gameState.choiceTwo);

	let disabled = $state(false);

	onMount(async () => {
		// Ladataan korttien tiedot ja asetetaan ne tilaan (gameSettings.svelte.ts) (B)
		await initalizeCards();
	});

	// Aloitetaan uusi peli, resettataan kortit ja muut muuttujat (B)
	const startNewGame = () => {
		resetCards();

		setTurns(0);
		setChoiceOne(null);
		setChoiceTwo(null);
	};

	const handlePlayerChoice = (card: Card) => {
		if (disabled) return;
		if (card.matched) return;
		if (card === choiceOne) return;

		if (choiceOne) {
			setChoiceTwo(card);
		} else {
			setChoiceOne(card);
		}
	};

	// Uuden kierroksen aloitus resettaa vain turns ja korttien valinnat (B)
	const startNewRound = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		incrementTurns(1);
	};

	$effect(() => {
		if (choiceOne && choiceTwo) {
			disabled = true;
			if (choiceOne.src === choiceTwo.src) {
				// Käännetään oikean parin kortit kuvapuoli ylöspäin (B)
				turnOverCorrectPair();
				startNewRound();
			} else {
				setTimeout(() => startNewRound(), 1000);
			}
			setTimeout(() => (disabled = false), 1000);
		}
	});

	// Tarkistetaan kaikkien korttien parien löytö (B)
	const isGameWon = $derived.by(() => {
		if (cards.length === 0) return false;
		return cards.every((card) => card.matched);
	});

	// Monitoroidaan voittoehtoja (B)
	$effect(() => {
		if (isGameWon && gameState.gameStatus === 'playing') {
			gameState.gameStatus = 'won';
		}
	});

	function handlePlayAgain() {
		// Resetataan status ja mennään takaisin pelin asetuksiin
		gameState.gameStatus = 'playing';
		goto(resolve('/settings'));
	}

	function closeWinModal() {
		// Just hide the modal by setting status back to playing
		// (or create a 'finished' status if you prefer)
		gameState.gameStatus = 'playing';
	}
</script>

<!-- Headeriin suoraan logo (B)-->
<Header gameLogo="" />

<main>
	<div class="App">
		<button onclick={startNewGame}>Aloita alusta</button>
		<div class="card-grid">
			{#each cards as card (card.id)}
				<SingleCard
					{card}
					{imgCover}
					{disabled}
					handleChoice={handlePlayerChoice}
					flipped={card === choiceOne || card === choiceTwo || card.matched}
				/>
			{/each}
		</div>
		<p>Turns: {turns}</p>
	</div>
	<p>Siirrot: {turns}</p>
</main>

<!-- Ehdot voittomodaalin ilmestymiselle ja sisällöille -->
{#if gameState.gameStatus === 'won'}
	<Modal>
		{#snippet header()}
			<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
				<h1>Voitit pelin!</h1>
				<button
					onclick={closeWinModal}
					style="background: none; border: none; font-size: 1.5rem; cursor: pointer;"
				>
					&times;
				</button>
			</div>
		{/snippet}

		{#snippet content()}
			<p>Onneksi olkoon! Sait kaikki parit kerättyä.</p>
			<p>Käytit yhteensä <strong>{gameState.turns}</strong> siirtoa.</p>
			<div style="display: flex; gap: 1rem; justify-content: center;">
				<Button text="Sulje" onclick={closeWinModal} />
				<Button text="Pelaa uudelleen" onclick={handlePlayAgain} />
			</div>
		{/snippet}
	</Modal>
{/if}

<!-- Footer (B) -->
<Footer></Footer>

<style>
	.App {
		max-width: 860px;
		margin: 0 auto;
		background: #fff;
		min-height: 100vh;
		text-align: center;
		padding: 1rem;
		color: white;
	}

	button {
		background: #aaa;
		border: 2px solid #fff;
		padding: 6px 12px;
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		font-size: 1em;
	}
	button:hover {
		background: black;
		color: #fff;
	}
	.card-grid {
		margin-top: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
	}
</style>
