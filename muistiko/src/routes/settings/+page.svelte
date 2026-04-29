<script lang="ts">
	import SettingSelector from '$lib/components/SettingSelector.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { gameState, setTheme } from '$lib/state/gameState.svelte';
	import type { Theme } from '$lib/state/gameState.svelte';
	import { setDifficulty } from '$lib/state/gameState.svelte';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface gameSettingOptions {
		text: string;
		placeholder: string;
		options: string[];
		type?: 'theme' | 'setting';
	}

	async function startGame() {
		await goto(resolve('/game'));
	}

	function handleThemeSwitch(event: Event) {
		const target = event.target as HTMLSelectElement;
		const chosen = target.value as Theme;
		setTheme(chosen);
	}
	// vaikeustasonkäsittely
	function kasitteleVaikeusTaso(count: number) {
		const value = Number(count);
		if (value === 12) setDifficulty('helppo');
		else if (value === 16) setDifficulty('keskivaikea');
		else if (value === 20) setDifficulty('vaikea');
		else if (value === 30) setDifficulty('todellavaikea');
	}

	function handleGeneralSetting(text: string, value: string) {
		if (text === 'Aikaraja (min)') {
			const seconds = Number(value) * 60;
			gameState.timeRemaining = seconds;
			gameState.hasTimer = true;
		}
	}

	const gameSettings: gameSettingOptions[] = [
		{
			text: 'Teema',
			placeholder: 'Valitse teema',
			options: ['Kissat', 'Koirat', 'Opettajat', 'TIKO'],
			type: 'theme'
		},
		{
			text: 'Korttien määrä',
			placeholder: 'Valitse määrä',
			options: ['12', '16', '20', '30']
		},
		{
			text: 'Aikaraja (min)',
			placeholder: 'Valitse aika',
			options: ['1', '2', '3']
		},
		{
			text: 'Sallitut hutit',
			placeholder: 'Valitse huteja',
			options: ['15', '7', '3']
		}
	];
</script>

<Header gameLogo="" />

<div class="gameSettings">
	{#each gameSettings as gameSetting (gameSetting.text)}
		{#if gameSetting.type === 'theme'}
			<div class="gameSetting-item">
				<label for="theme-select">{gameSetting.text}</label>
				<select value={gameState.theme} onchange={handleThemeSwitch}>
					<option disabled value="">{gameSetting.placeholder}</option>
					{#each gameSetting.options as option (option)}
						<option value={option.toLowerCase()}>{option}</option>
					{/each}
				</select>
			</div>
		{:else}
			<SettingSelector
				onChange={kasitteleVaikeusTaso}
				//muokkaus dropdowniin
				text={gameSetting.text}
				placeholder={gameSetting.placeholder}
				options={gameSetting.options}
			/>
		{/if}
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

	.gameSetting-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.gameSetting-item label {
		font-weight: bold;
	}

	.gameSetting-item select {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	.startButton {
		text-align: center;
	}
</style>
