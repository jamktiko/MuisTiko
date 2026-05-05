<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import GameInfo from '$lib/components/gameInfo.svelte';
	import SoundButton from './soundButton.svelte';
	import SettingsModal from './SettingsModal.svelte';
	interface Props {
		gameLogo: string | null;
	}

	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
	let showSettings = $state(false);
</script>

<header>
	<div class="header-row">
		{#if gameLogo}
			<div class="logo-container">
				<img src="/data/logot/muistiko_kissat.svg" alt="Muistiko logo" />
			</div>
		{/if}

		<nav>
			<div class="header-left">
				<!-- Kotinappi -->
				<button
					class="home-button"
					onclick={() => goto(resolve('/'))}
					aria-label="Home"
					title="Home"
				>
					<img src="/data/ikonit/koti_nappi.svg" alt="Home" />
				</button>
				<!-- Ääni-nappi (tulee soundButton.svelte:stä)-->
				<SoundButton class="volume-button" />
			</div>
			<div class="header-right">
				<!-- Infonappi -->
				<button
					class="info-button"
					onclick={() => (showInfo = true)}
					aria-label="Info"
					title="Info"
				>
					<img src="/data/ikonit/peliohjeet_nappi.svg" alt="Info" />
				</button>

				<!-- Asetus-nappi -->
				<button
					class="settings-button"
					onclick={() => (showSettings = true)}
					aria-label="Settings"
					title="Settings"
				>
					<img src="/data/ikonit/asetukset_nappi.svg" alt="Settings" />
				</button>
			</div>
		</nav>
	</div>

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
	{/if}

	{#if showSettings}
		<SettingsModal closeModal={() => (showSettings = false)} />
	{/if}
</header>
