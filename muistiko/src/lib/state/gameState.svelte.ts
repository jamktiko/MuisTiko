// Tuodaan valittu ID:n pituus constant arvoista
import { ID_STRING_LENGTH } from '../constants';
import { createIdString } from './utils/createIdString';
import { getImagePath, getThemeData } from './utils/dataHandling';

export type Theme = 'kissat' | 'koirat' | 'opettajat' | 'tikologot';

// Interface korteille
export interface Card {
	src: string;
	matched: boolean;
	id: string;
}

export type Difficulty = 'helppo' | 'keskivaikea' | 'vaikea';

// Määritellään pelitilan tyyppi
interface GameState {
	points: number;
	difficulty: Difficulty;
	theme: Theme;
	cards: Card[];
	turns: number;
	choiceOne: Card | null;
	choiceTwo: Card | null;
	disabled: boolean;
}

// Tässä on koko sovelluksen yhteinen tila ns. Yhden totuuden periaatteella, voidaan helposti muutta mistä tahansa sovelluksen osasta käsin
export const gameState = $state<GameState>({
	points: 0,
	difficulty: 'keskivaikea',
	theme: 'kissat' as Theme,
	cards: [],
	turns: 0,
	choiceOne: null,
	choiceTwo: null,
	disabled: false
});

// Tilan käsittely funktiot
export function incrementPoints(value: number) {
	gameState.points += value;
}

export function setPoints(value: number) {
	gameState.points = value;
}

export function setDifficulty(value: Difficulty) {
	gameState.difficulty = value;
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

	setCards(suffleCards(newCards));
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

// Lataa valitun teeman datan mukaiset kortit ja alustaa ne
export async function initalizeCards() {
	try {
		const themeData = await getThemeData(gameState.theme);

		const cardData: Card[] = themeData.map((item: { pic: string }) => ({
			src: getImagePath(gameState.theme, item.pic),
			matched: false,
			id: createIdString(ID_STRING_LENGTH)
		}));

		const duplicatedCards = duplicateCards(cardData);

		// Asetetaan sekoitetut kortit tilaan
		setCards(suffleCards(duplicatedCards));
		console.log(gameState.cards);
	} catch (error) {
		console.log('Error while initializing cards', error);
	}
}

// Luodaan joka kortille pari
function duplicateCards(cardData: Card[]) {
	const duplicatedArray: Card[] = [];

	for (const card of cardData) {
		duplicatedArray.push({ ...card, id: card.id });
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
export function suffleCards(cardData: Card[]) {
	return [...cardData].sort(() => Math.random() - 0.5);
}
