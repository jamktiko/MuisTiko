<script lang="ts">
	import SettingSelector from '$lib/components/SettingSelector.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { gameState, setTheme, setDifficulty, setTimelimit } from '$lib/state/gameState.svelte';
	import type { Theme } from '$lib/state/gameState.svelte';
	import type { Difficulty } from '$lib/state/gameState.svelte';
	import type { TimeLimit } from '$lib/state/gameState.svelte';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface gameSettingOptions {
		text: string;
		placeholder: string;
		options: TimeLimit[] | Theme[] | Difficulty[];
		type?: 'theme' | 'setting';
		function: (value: string) => void;
	}

	// aloita peli nappi, joka vie pelisivulle
	async function startGame() {
		await goto(resolve('/game'));
	}

	// funktiot, jotka asetetaan settings valikon funktioiksi
	function handleThemeSwitch(value: string) {
		setTheme(value as Theme);
	}

	/* function handleGeneralSetting(text: string, value: string) {
		if (text === 'Aikaraja (min)') {
			const seconds = Number(value) * 60;
			gameState.timeRemaining = seconds;
			gameState.hasTimer = true;
		}
	}*/

	function changeTimelimit(value: string) {
		setTimelimit(Number(value) as TimeLimit);
	}

	function difficultySettings(value: string) {
		setDifficulty(value as Difficulty);
	}

	// settings valikko, joka määrittelee kaikki asetukset ja niiden funktiot
	const gameSettings: gameSettingOptions[] = [
		{
			text: 'Teema',
			placeholder: 'Valitse teema',
			options: ['Kissat', 'Koirat', 'Opettajat', 'Tikologos'],
			type: 'theme',
			function: handleThemeSwitch
		},
		{
			text: 'Korttien määrä',
			placeholder: 'Valitse määrä',
			options: ['Helppo', 'Keskivaikea', 'Vaikea', 'Todella vaikea'],
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
</script>

<Header gameLogo="" />

<!-- settings valikko, joka luo SettingSelector komponentit gameSettings taulukon perusteella -->
<div class="gameSettings">
	{#each gameSettings as gameSetting (gameSetting.text)}
		<SettingSelector
			onChange={gameSetting.function}
			text={gameSetting.text}
			placeholder={gameSetting.placeholder}
			options={gameSetting.options}
		/>
	{/each}
</div>

<div class="startButton">
	<Button text="Aloita peli!" onclick={startGame} />
</div>

<Footer></Footer>

<style>
	.gameSettings {
		display: grid;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}

	.startButton {
		text-align: center;
	}
</style>
