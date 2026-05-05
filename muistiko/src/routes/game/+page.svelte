<script lang="ts">
	import { onMount } from 'svelte';
	import SingleCard from '$lib/components/SingleCard.svelte';
	import WinModal from '$lib/components/WinModal.svelte';
	import LoseModal from '$lib/components/LoseModal.svelte';
	//import { CARD_IMAGE_COVER_URL } from '$lib/constants';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { getTheme } from '$lib/state/themeState.svelte';

	// Haetaan gameState ja kaikki muu storesta (B)
	import {
		gameState,
		startNewGame,
		type Card,
		initalizeCards,
		setChoiceOne,
		setChoiceTwo,
		incrementTurns,
		turnOverCorrectPair,
		setDifficulty,
		setTheme,
		type Theme,
		type Difficulty,
		setTimelimit,
		type TimeLimit,
		triggerboosterShowTwo
	} from '$lib/state/gameState.svelte';
	import {
		loadDifficultyFromStorage,
		loadThemeFromStorage,
		loadTimelimitFromStorage,
		setDifficultyToStorage,
		setThemeToStorage,
		setTimelimitToStorage
	} from '$lib/localstorage/localstorage';

	let theme = $derived(gameState.theme ? getTheme(gameState.theme) : null);
	let imgCover = $derived(theme?.colors.card || '');
	let background = $derived(theme?.colors.background || '');

	// Tilapäinen muuttuja, jossa korttien taustapuoli (B)

	// Haetaan koko sovelluksen tila yhdestä paikasta (B)
	let cards = $derived(gameState.cards);
	let turns = $derived(gameState.turns);
	let choiceOne = $derived(gameState.choiceOne);
	let choiceTwo = $derived(gameState.choiceTwo);
	let disabled = $state(false);

	$effect.pre(() => {
		// Lataa tallennetut arvot
		const savedTheme = localStorage.getItem('theme');
		const savedDiff = localStorage.getItem('difficulty');
		const savedTime = localStorage.getItem('timelimit');

		if (savedTheme && !gameState.theme) setTheme(savedTheme as Theme);
		if (savedDiff && !gameState.difficulty) setDifficulty(savedDiff as Difficulty);
		if (savedTime && !gameState.timelimit) setTimelimit(savedTime as TimeLimit);
	});

	// Ladataan korttien tiedot ja asetetaan ne tilaan, kun komponentti renderöidään (B)
	onMount(async () => {
		// Jos tietoja ei ole lataushetkellä tilassa, ne ladataan localstoragesta (esim. kun sivu refreshataan) (B)
		if (!gameState.theme || !gameState.difficulty || !gameState.timelimit) {
			setTheme(loadThemeFromStorage() as Theme);
			setDifficulty(loadDifficultyFromStorage() as Difficulty);
			setTimelimit(loadTimelimitFromStorage() as TimeLimit);
		}
		// Asetetaan localstorageen kaikki tarvittavat tiedot, jotta ne voidaan hakea uudestaan, jos sivu refreshataan (B)
		setThemeToStorage(gameState.theme as string);
		setDifficultyToStorage(gameState.difficulty as string);
		setTimelimitToStorage(gameState.timelimit as string);

		initalizeCards();
	});

	// Käsky, joka asetetaan korttien onclickiin
	const handlePlayerChoice = (card: Card) => {
		if (disabled) return; // Estetään korttien klikkaaminen, kun peli on tilassa, jossa kortteja ei saisi klikata
		if (card.matched) return; // Estetään klikattujen korttien klikkaaminen uudestaan
		if (card === choiceOne) return; // Estetään samaa korttia klikkaamasta uudestaan

		if (choiceOne) {
			// Jos ensimmäinen kortti on jo valittu, asetetaan toinen kortti
			setChoiceTwo(card);
		} else {
			// Muuten asetetaan ensimmäinen kortti
			setChoiceOne(card);
		}
	};

	// Uuden kierroksen aloitus resettaa vain turns ja korttien valinnat
	const startNewRound = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		incrementTurns(1);
	};

	$effect(() => {
		// Efekti tarkistaa, onko valitut kortit pari ja päivittää pelin tilaa sen mukaan
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

	// Derived, joka tarkistaa, onko peli voitettu (B)
	const isGameWon = $derived.by(() => {
		if (gameState.cards.length === 0) return false;
		return gameState.cards.every((card) => card.matched);
	});

	// Efekti tarkistaa, onko peli voitettu ja päivittää pelin tilan sen mukaan (B)
	$effect(() => {
		if (isGameWon && gameState.gameStatus === 'playing') {
			gameState.gameStatus = 'won';
		}
	});
</script>

<!-- Headeriin suoraan logo (B)-->
<Header gameLogo="" />

<Timer />
<main>
	<div class="App" style="background-image: url({background})">
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
		<button
			onclick={triggerboosterShowTwo}
			disabled={gameState.boosterShowTwoActive || gameState.gameStatus !== 'playing'}
			class="rounded bg-yellow-400 p-2 hover:bg-yellow-500 disabled:opacity-50"
		>
			Show 2 Random Cards!
		</button>
		<p>Siirrot: {turns}</p>
	</div>
</main>

<!-- Ehdot voittomodaalin ilmestymiselle ja sisällöille (B) -->
{#if gameState.gameStatus === 'won'}
	<WinModal />
{/if}

{#if gameState.gameStatus === 'lost' && gameState.timelimit !== 'Ei rajaa'}
	<LoseModal />
{/if}

<Footer />

<style>
	.App {
		max-width: 860px;
		margin: 0 auto;
		background: #fff;
		min-height: 100vh;
		text-align: center;
		padding: 1rem;
		color: grey;
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
