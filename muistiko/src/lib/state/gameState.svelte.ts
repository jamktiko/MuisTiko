// Tuodaan chosen ID:n pituus constant arvoista
import { ID_STRING_LENGTH } from '../constants';
import { createIdString } from './utils/createIdString';
import { getImagePath, getThemeData } from './utils/dataHandling';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { resetTimer } from '$lib/state/timerState.svelte';

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
			return NaN;
		case 1:
			return 60;
		case 2:
			return 120;
		case 3:
			return 180;
		default:
			return NaN;
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
	gameStatus: 'playing'
});

// Tilankäsittelyn funktiot

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

	setCards(shuffleCards(newCards));
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
	gameState.theme = gameState.theme?.toLowerCase() as Theme;
	try {
		const themeData = await getThemeData(gameState.theme);
		const cardcount = difficultySetting(gameState.difficulty);
		const selectedCards = themeData.slice(0, cardcount / 2);
		const cardData: Card[] = selectedCards.map((item: { pic: string }) => ({
			src: getImagePath(gameState.theme, item.pic),
			matched: false,
			id: createIdString(ID_STRING_LENGTH)
		}));

		const duplicatedCards = duplicateCards(cardData);

		// Asetetaan sekoitetut kortit tilaan
		setCards(shuffleCards(duplicatedCards));
		console.log(gameState.cards);
	} catch (error) {
		console.log('Error while initializing cards', error);
	}
}

// Luodaan joka kortille pari
function duplicateCards(cardData: Card[]) {
	const duplicatedArray: Card[] = [];

	for (const card of cardData) {
		duplicatedArray.push({ ...card, id: createIdString(ID_STRING_LENGTH) });
		duplicatedArray.push({ ...card, id: createIdString(ID_STRING_LENGTH) });
	}

	return duplicatedArray;
}

export function turnOverCorrectPair() {
	gameState.cards = gameState.cards.map((card) =>
		card.src === gameState.choiceOne!.src ? { ...card, matched: true } : card
	);
}

// Sekoittaa kortit
export function shuffleCards(cardData: Card[]) {
	return [...cardData].sort(() => Math.random() - 0.5);
}

// Alustaa uudelleenpelaamisen (B)
export const startNewGame = () => {
	resetCards();
	setTurns(0);
	resetTimer();
	setChoiceOne(null);
	setChoiceTwo(null);
	gameState.gameStatus = 'playing';
};

// Funktio voitto/häviömodaalin uudelleenpelausnappiin, joka vie asetussivulle (B)
export function handlePlayAgain() {
	startNewGame();
	gameState.gameStatus = 'playing';
	goto(resolve('/settings'));
}
