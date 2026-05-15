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
	import { changeMusic } from '$lib/state/soundState.svelte';
	import type { ThemeName } from '$lib/state/themeState.svelte';
	import { onMount } from 'svelte';

	// Derived statet, jotka tarkistavat onko kaikki asetukset valittu (B)
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

	// Funktio, joka aloittaa pelin ja navigoi pelisivulle (B)
	async function startGame() {
		console.log(theme, difficulty, timelimit);
		startNewGame();
		await goto(resolve('/game'));
	}

	// Teeman vaihto päivittää staten ja localStoragen (B), sekä vaihtaa pelimusiikin uuden teeman mukaiseksi (V)
	function handleThemeSwitch(value: string) {
		setTheme(value as Theme);
		localStorage.setItem('theme', value);
		changeMusic(value as ThemeName);
	}

	function changeTimelimit(value: string) {
		if (value === 'Ei rajaa') {
			setTimelimit(value as TimeLimit);
			return;
		}
		setTimelimit(Number(value) as TimeLimit);
		localStorage.setItem('timelimit', value);
	}

	// Vaikeustason asetus päivittää staten ja localStoragen (B)
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
			function: handleThemeSwitch // Funktio, joka hoitaa teeman vaihdon ja siihen liittyvät toimenpiteet (B)
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

	onMount(() => {
		// Resettaa staten ettei käyttäjä pääse läpi tekemättä valintoja (ei käytä vanhoja valintoja) (B)
		setTheme(null);
		setDifficulty(null);
		setTimelimit(null);
	});
	// Derived state, joka tarkistaa onko kaikki asetukset valittu, jotta "Aloita peli" -nappi voidaan aktivoida (B)
	const isReadyToStart = $derived(theme !== null && difficulty !== null && timelimit !== null);
</script>

<!-- settings valikko, joka luo SettingSelector komponentit gameSettings taulukon perusteella -->
<div class="landing-page">
	<Header gameLogo="kissat" />
	<main class="main-content">
		<div class="content-box settings-content">
			<div class="dropdown-row">
				{#each gameSettings as gameSetting (gameSetting.text)}
					<SettingSelector
						onChange={gameSetting.function}
						placeholder={gameSetting.placeholder}
						options={gameSetting.options}
					/>
				{/each}
			</div>
			<Button
				class="start-button"
				disabled={!isReadyToStart}
				text="ALOITA PELI"
				onclick={startGame}
				ariaLabel="Aloita peli"
			/>
		</div>
	</main>
	<Footer />
</div>
