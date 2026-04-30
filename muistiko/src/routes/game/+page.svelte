<script lang="ts">
	import { onMount } from 'svelte';
	import SingleCard from '$lib/components/SingleCard.svelte';
	import WinModal from '$lib/components/WinModal.svelte';
	import LoseModal from '$lib/components/LoseModal.svelte';
	import { CARD_IMAGE_COVER_URL } from '$lib/constants';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Timer from '$lib/components/Timer.svelte';

	// haetaan gameState ja kaikki muu (B)
	import {
		gameState,
		startNewGame,
		type Card,
		initalizeCards,
		setChoiceOne,
		setChoiceTwo,
		incrementTurns,
		turnOverCorrectPair
	} from '$lib/state/gameState.svelte';

	// Tilapäinen muuttuja, jossa korttien taustapuoli
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

	// Efekti asettaa pelin statuksen kun peli voitettu = true (B)
	const isGameWon = $derived.by(() => {
		if (gameState.cards.length === 0) return false;
		return gameState.cards.every((card) => card.matched);
	});

	$effect(() => {
		if (isGameWon && gameState.gameStatus === 'playing') {
			gameState.gameStatus = 'won';
		}
	});
</script>

<!-- Headeriin suoraan logo (B)-->
<Header gameLogo="" />

{#if gameState.timelimit}
	<Timer />
{/if}

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
		<p>Siirrot: {turns}</p>
	</div>
</main>

<!-- Ehdot voittomodaalin ilmestymiselle ja sisällöille (B) -->
{#if gameState.gameStatus === 'won'}
	<WinModal />
{/if}

{#if gameState.gameStatus === 'lost'}
	<LoseModal />
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

	.App p {
		font-size: 1.2rem;
		margin-top: 1rem;
		color: black;
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
