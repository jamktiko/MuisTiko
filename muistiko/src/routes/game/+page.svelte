<script lang="ts">
	import { onMount } from 'svelte';
	import SingleCard from '$lib/components/SingleCard.svelte';
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
	import Timer from '$lib/components/Timer.svelte';

	// Voidaan käyttää myöhemmin kun pitää lisätä muutakin teemaan kuin vain kortit
	let theme = $derived(gameState.theme);

	const imgCover = CARD_IMAGE_COVER_URL;

	// Haetaan koko sovelluksen tila yhdestä paikasta
	let cards = $derived(gameState.cards);
	let turns = $derived(gameState.turns);
	let choiceOne = $derived(gameState.choiceOne);
	let choiceTwo = $derived(gameState.choiceTwo);

	let disabled = $state(false);

	onMount(async () => {
		// Ladataan korttien tiedot ja asetetaan ne tilaan (gameSettings.svelte.ts)
		await initalizeCards();
	});

	// Aloitetaan uusi peli, resettataan kortit ja muut muuttujat
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

	const startNewRound = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		incrementTurns(1);
	};

	$effect(() => {
		if (choiceOne && choiceTwo) {
			disabled = true;
			if (choiceOne.src === choiceTwo.src) {
				// Käännetään oikean parin kortit kuvapuoli ylöspäin
				turnOverCorrectPair();
				startNewRound();
			} else {
				setTimeout(() => startNewRound(), 1000);
			}
			setTimeout(() => (disabled = false), 1000);
		}
	});

	console.log(gameState);
</script>

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
		<p>Turns: {turns}</p>
	</div>
	<p>Siirrot: {turns}</p>
</main>

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
