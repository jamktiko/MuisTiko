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
		triggerboosterShowTwo,
		goToHome,
		triggerBoosterFindMatch
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

<div class="theme-wrapper" data-theme={gameState.theme}>
	<!-- Headeriin suoraan logo (B)-->
	<Header gameLogo={gameState.theme} />

	<main class="game-page">
		<div class="main-content">
			<div class="content-box game-box">
				<div class="game-top-row">
					<!-- Aloita alusta-napi -->
					<button class="game-nav-button" onclick={startNewGame}>Aloita alusta</button>
					<!-- Käänötjen määrä -->
					<div class="game-turns">Käännöt: {turns}</div>
					<!-- Ajastin, kulkee ylös tai alas (R) -->
					<Timer />
					<!-- Lopeta peli-nappi -->
					<button class="game-nav-button" onclick={goToHome}>Lopeta peli</button>
				</div>
				<!-- Kortit -->
				<div class="card-grid" data-cards={cards.length}>
					{#each cards as card (card.id)}
						<SingleCard
							{card}
							{imgCover}
							{disabled}
							handleChoice={handlePlayerChoice}
							flipped={card === choiceOne ||
								card === choiceTwo ||
								card.matched ||
								gameState.boosterShowTwoCards.includes(card.id) ||
								gameState.boosterFindMatchCards.includes(card.id)}
						/>
					{/each}
				</div>
				<!-- BOOSTERIT -->
				<div>
					<!-- Boosterinappi: näytä kaksi (B) -->
					<button
						class="booster-show-two"
						onclick={triggerboosterShowTwo}
						disabled={gameState.boosterShowTwoUsed ||
							gameState.boosterShowTwoActive ||
							gameState.gameStatus !== 'playing'}
					>
						<!-- Napin isältö muuttuu riippuen siitä, onko boosteria jo käytetty vai ei -->
						{#if gameState.boosterShowTwoUsed}
							Boosteri käytetty!
						{:else}
							Näytä 2 satunnaista korttia!
						{/if}
					</button>
					<!-- Boosterinappi: etsi pari (B)-->
					<button
						class="booster-find-match"
						onclick={triggerBoosterFindMatch}
						disabled={gameState.boosterFindMatchUsed ||
							gameState.boosterFindMatchActive ||
							gameState.gameStatus !== 'playing'}
					>
						<!-- Napin sisältö muuttuu riippuen boosterin käytöstä -->
						{#if gameState.boosterFindMatchUsed}
							Boosteri käytetty!
						{:else}
							Näytä pari!
						{/if}
					</button>
				</div>
			</div>
		</div>
		<Footer />
	</main>
</div>
<!-- Ehdot voittomodaalin ilmestymiselle ja sisällöille (B) -->
{#if gameState.gameStatus === 'won'}
	<WinModal />
{/if}

{#if gameState.gameStatus === 'lost' && gameState.timelimit !== 'Ei rajaa'}
	<LoseModal />
{/if}
