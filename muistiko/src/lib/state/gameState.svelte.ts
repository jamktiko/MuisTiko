// Tuodaan chosen ID:n pituus constant arvoista
import { ID_STRING_LENGTH } from '../constants';
import { createIdString } from './utils/createIdString';
import { getImagePath, getThemeData } from './utils/dataHandling';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import {
	clearStoredTimer,
	initTimer,
	resetSimpleTimer,
	startSimpleTimer,
	stopTimer
} from '$lib/state/timerState.svelte';
import { playBlockSound } from '$lib/state/soundState.svelte';
import { type ThemeItem } from './utils/dataHandling';

export type Theme = 'Kissat' | 'Koirat' | 'Opettajat' | 'TIKO' | null;

// Interface korteille
export interface Card {
	src: string;
	matched: boolean;
	id: string;
}
// vaikeustaso määrittely
export type Difficulty = '12' | '16' | '20' | '30' | null;

export type TimeLimit = string | 1 | 2 | 3 | null;

export function difficultySetting(d: Difficulty): number {
	switch (d) {
		case '12':
			return 12;
		case '16':
			return 16;
		case '20':
			return 20;
		case '30':
			return 30;
		default:
			return 12;
	}
}

export function timeLimitToSeconds(t: TimeLimit): number | null {
	switch (t) {
		case 'Ei rajaa':
			return null;
		case 1:
			return 60;
		case 2:
			return 120;
		case 3:
			return 180;
		default:
			return null;
	}
}

// Määritellään pelitilan tyyppi (B)
interface GameState {
	points: number;
	difficulty: Difficulty;
	theme: Theme;
	cards: Card[];
	turns: number;
	timelimit: TimeLimit;
	choiceOne: Card | null;
	choiceTwo: Card | null;
	disabled: boolean;
	gameStatus: 'playing' | 'won' | 'lost';
	// boosterShowTwo-tilamuuttujat (B)
	boosterShowTwoActive: boolean;
	boosterShowTwoCards: string[];
	boosterShowTwoUsed: boolean;
	// boosterMatchTwo-tilamuuttujat (B)
	boosterFindMatchUsed: boolean;
	boosterFindMatchActive: boolean;
	boosterFindMatchCards: string[];
}

// Tässä on koko sovelluksen yhteinen tila ns. Yhden totuuden periaatteella, voidaan helposti muutta mistä tahansa sovelluksen osasta käsin (B)
export const gameState = $state<GameState>({
	points: 0,
	difficulty: null,
	theme: null as Theme,
	cards: [],
	turns: 0,
	timelimit: null,
	choiceOne: null,
	choiceTwo: null,
	disabled: false,
	gameStatus: 'playing',
	// boosterShowTwo-tilamuuttujat (B)
	boosterShowTwoUsed: false,
	boosterShowTwoActive: false,
	boosterShowTwoCards: [],
	// boosterMatchTwo-tilamuuttujat (B)
	boosterFindMatchUsed: false,
	boosterFindMatchActive: false,
	boosterFindMatchCards: []
});

// Tilankäsittelyn funktiot (B)

export function incrementPoints(value: number) {
	gameState.points += value;
}

export function setPoints(value: number) {
	gameState.points = value;
}

export function setDifficulty(value: Difficulty) {
	gameState.difficulty = value;
}

export function setTimelimit(value: TimeLimit) {
	gameState.timelimit = value;
}

export function setTheme(value: Theme) {
	gameState.theme = value;
}

export function setCards(value: Card[]) {
	gameState.cards = value;
}

// Asetetaan matched arvo falseksi, sekoitetaan kortit ja päivitetään tila
export function resetCards() {
	const newCards = gameState.cards.map((card) => {
		return { ...card, matched: false };
	});
	setCards(getRandomCards(newCards));
}

export function incrementTurns(value: number) {
	gameState.turns += value;
}

export function setTurns(value: number) {
	gameState.turns = value;
}
export function setChoiceOne(value: Card | null) {
	gameState.choiceOne = value;
}

export function setChoiceTwo(value: Card | null) {
	gameState.choiceTwo = value;
}

export function setDisabled(value: boolean) {
	gameState.disabled = value;
}

// Lataa valitun teeman datan mukaiset kortit ja alustaa ne (B)
export async function initalizeCards() {
	const themeKey = gameState.theme?.toLowerCase();
	try {
		const themeData = (await getThemeData(themeKey as Theme)) as ThemeItem[];
		const cardcount = difficultySetting(gameState.difficulty);
		const randomCards = getRandomCards(themeData).slice(0, cardcount / 2);
		const cardData: Card[] = randomCards.map((item: ThemeItem) => ({
			src: getImagePath(themeKey as Theme, item.pic),
			matched: false,
			id: createIdString(ID_STRING_LENGTH)
		}));

		const duplicatedCards = duplicateCards(cardData);

		// Asetetaan sekoitetut kortit tilaan
		setCards(getRandomCards(duplicatedCards));
		console.log(gameState.cards);
	} catch (error) {
		console.log('Error while initializing cards', error);
	}
}

// Tuplaa kortit, jotta niistä saadaan parit
function duplicateCards(cardData: Card[]) {
	const duplicatedArray: Card[] = [];

	// Käydään kortit läpi ja luodaan niistä parit, samalla generoidaan uusi ID jokaiselle kortille, jotta ne voidaan erottaa toisistaan
	for (const card of cardData) {
		duplicatedArray.push({ ...card, id: createIdString(ID_STRING_LENGTH) });
		duplicatedArray.push({ ...card, id: createIdString(ID_STRING_LENGTH) });
	}

	return duplicatedArray;
}
// Merkitään kortit jotka pelaaja on valinnut matchatuiksi, jos ne ovat pari
export function turnOverCorrectPair() {
	gameState.cards = gameState.cards.map((card) =>
		card.src === gameState.choiceOne!.src ? { ...card, matched: true } : card
	);
}

// Sekoittaa kortit uudestaan joka kerta, kun funktio kutsutaan, jotta kortit eivät ole aina samassa järjestyksessä (R)
// Fisher-Yates algoritmi (R)
function getRandomCards<T>(cards: T[]): T[] {
	const result = [...cards];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// Alustaa uudelleenpelaamisen
export const startNewGame = async () => {
	await initalizeCards();
	setTurns(0);
	stopTimer();
	resetSimpleTimer();
	clearStoredTimer();
	initTimer();
	startSimpleTimer();
	setChoiceOne(null);
	setChoiceTwo(null);
	gameState.boosterShowTwoUsed = false;
	gameState.boosterShowTwoActive = false;
	gameState.boosterShowTwoCards = [];
	gameState.boosterFindMatchUsed = false;
	gameState.boosterFindMatchActive = false;
	gameState.boosterFindMatchCards = [];
	gameState.disabled = false;
	gameState.gameStatus = 'playing';
};

// Funktio voitto/häviömodaalin uudelleenpelausnappiin, joka vie asetussivulle (B)
export async function handlePlayAgain() {
	await startNewGame();
	gameState.gameStatus = 'playing';
	goto(resolve('/settings'));
}

// Funktio uudelleenpelausnappiin pelisivulla vie etusivulle (B)
export function goToHome() {
	goto(resolve('/'));
}

// FUNKTIO BOOSTERILLE SHOW TWO (Näyttää pelaajalle kaksi korttia) (B)
export function triggerboosterShowTwo() {
	if (
		gameState.boosterShowTwoUsed ||
		gameState.boosterShowTwoActive ||
		gameState.disabled ||
		gameState.gameStatus !== 'playing'
	) {
		return;
	}

	// Etsii kaikki kortit, jotka eivät ole vielä matchattuina ja jotka eivät ole choiceOne tai choiceTwo, jotta niitä ei näytettäisi
	const availableCards = gameState.cards.filter(
		(card) => !card.matched && card !== gameState.choiceOne && card !== gameState.choiceTwo
	);

	if (availableCards.length < 2) return;

	// Merkitään boosterShowTwo käytetyksi, jotta sitä ei voi käyttää uudestaan saman pelin aikana (B)
	gameState.boosterShowTwoUsed = true;

	// Valitaan satunnaisesti kaksi korttia saatavilla olevista korteista, asetetaan ne tilaan ja aktivoidaan boosterShowTwo (B)
	const shuffled = getRandomCards(availableCards);
	const selected = shuffled.slice(0, 2).map((c) => c.id);

	// 	Asetetaan boosterShowTwo-kortit tilaan ja aktivoidaan boosterShowTwo, sekä estetään pelaaja klikkaamasta kortteja boosterShowTwon ollessa aktiivisena (B)
	gameState.boosterShowTwoCards = selected;
	gameState.boosterShowTwoActive = true;
	gameState.disabled = true;
	playBlockSound();

	// 	Asetetaan boosterShowTwo pois päältä x sekunnin kuluttua, ja vapautetaan pelaaja klikkaamaan kortteja uudestaan (B)
	setTimeout(() => {
		gameState.boosterShowTwoActive = false;
		gameState.boosterShowTwoCards = [];
		gameState.disabled = false;
	}, 1500);
}

// FUNKTIO BOOSTERILLE FIND MATCH (Etsii pelaajalle yhden parin) (B)
export function triggerBoosterFindMatch() {
	if (
		gameState.boosterFindMatchUsed ||
		gameState.boosterFindMatchActive ||
		gameState.disabled ||
		gameState.gameStatus !== 'playing'
	) {
		return;
	}

	// Etsii kaikki kortit, jotka eivät ole vielä matchattuina
	const unmatched = gameState.cards.filter((card) => !card.matched);

	// Etsii ensimmäisen parin korteista, jotka eivät ole vielä matchattuina, ja asettaa niiden ID:t tilamuuttujiin (B)
	let pair: string[] = [];
	for (const card of unmatched) {
		const match = unmatched.find((c) => c.src === card.src && c.id !== card.id);
		if (match) {
			pair = [card.id, match.id];
			break;
		}
	}
	// Jos pari löytyy, asetetaan boosterFindMatch käytetyksi, tilamuuttujiin ja aktivoidaan boosterFindMatch, sekä estetään pelaaja klikkaamasta kortteja boosterFindMatchin ollessa aktiivisena (B)
	if (pair.length === 2) {
		gameState.boosterFindMatchUsed = true;
		gameState.boosterFindMatchActive = true;
		gameState.disabled = true;
		gameState.boosterFindMatchCards = pair;
		playBlockSound();

		// Asetetaan boosterFindMatch pois päältä x sekunnin kuluttua, ja vapautetaan pelaaja klikkaamaan kortteja uudestaan (B)
		setTimeout(() => {
			gameState.boosterFindMatchActive = false;
			gameState.boosterFindMatchCards = [];
			gameState.disabled = false;
		}, 1500);
	}
}
