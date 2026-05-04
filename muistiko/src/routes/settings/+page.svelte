<script lang="ts">
	import SettingSelector from '$lib/components/SettingSelector.svelte';
	import { goto } from '$app/navigation';
	import {
		setTheme,
		setDifficulty,
		setTimelimit,
		startNewGame,
		gameState
	} from '$lib/state/gameState.svelte';
	import type { Theme } from '$lib/state/gameState.svelte';
	import type { Difficulty } from '$lib/state/gameState.svelte';
	import type { TimeLimit } from '$lib/state/gameState.svelte';
	import Button from '$lib/components/Button.svelte';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';

	const theme = $derived(gameState.theme);
	const difficulty = $derived(gameState.difficulty);
	const timelimit = $derived(gameState.timelimit);

	interface GameSetting {
		text: string;
		placeholder: string;
		options: TimeLimit[] | Theme[] | Difficulty[];
		type?: 'theme' | 'setting';
		function: (value: string) => void;
	}

	// aloita peli nappi, joka vie pelisivulle
	async function startGame() {
		console.log(theme, difficulty, timelimit);
		startNewGame();
		await goto(resolve('/game'));
	}

	// funktiot, jotka asetetaan settings valikon funktioiksi
	function handleThemeSwitch(value: string) {
		setTheme(value as Theme);
		localStorage.setItem('theme', value);
	}

	function changeTimelimit(value: string) {
		if (value === 'Ei rajaa') {
			setTimelimit(value as TimeLimit);
			return;
		}
		setTimelimit(Number(value) as TimeLimit);
		localStorage.setItem('timelimit', value);
	}

	function difficultySettings(value: string) {
		setDifficulty(value as Difficulty);
		localStorage.setItem('difficulty', value);
	}

	// settings valikko, joka määrittelee kaikki asetukset ja niiden funktiot
	const gameSettings: GameSetting[] = [
		{
			text: 'Teema',
			placeholder: 'Valitse teema',
			options: ['Kissat', 'Koirat', 'Opettajat', 'TIKO'],
			type: 'theme',
			function: handleThemeSwitch
		},
		{
			text: 'Korttien määrä',
			placeholder: 'Valitse määrä',
			options: ['12', '16', '20', '30'],
			type: 'setting',
			function: difficultySettings
		},
		{
			text: 'Aikaraja (min)',
			placeholder: 'Valitse aika',
			options: ['Ei rajaa', '1', '2', '3'],
			type: 'setting',
			function: changeTimelimit
		}
	];

	function allSettingsSelected() {
		console.log(theme, difficulty, timelimit);
		return theme && difficulty && timelimit ? true : false;
	}
</script>

<Header gameLogo="" />

<!-- settings valikko, joka luo SettingSelector komponentit gameSettings taulukon perusteella -->
<div class="gameSettings">
	<main class="main-content">
		{#each gameSettings as gameSetting (gameSetting.text)}
			<SettingSelector
				onChange={gameSetting.function}
				text={gameSetting.text}
				placeholder={gameSetting.placeholder}
				options={gameSetting.options}
			/>
		{/each}
		<div class="start-button">
			<Button disabled={!allSettingsSelected()} text="Aloita peli!" onclick={startGame} />
		</div>
	</main>
</div>

<Footer />

<style>
	.gameSettings {
		display: grid;
		gap: 5rem;
		max-width: 400px;
		margin: 0 auto;
		min-height: 100vh;
	}

	.start-button {
		background: #aaa;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.5rem;
		color: black;
		font-weight: bold;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.start-button:hover {
		transform: scale(1.05);
	}

	.start-button:active {
		transform: scale(0.98);
	}
</style>
