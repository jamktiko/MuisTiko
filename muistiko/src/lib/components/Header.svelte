<script lang="ts">
	import GameInfo from '$lib/components/gameInfo.svelte';
	import SoundButton from './soundButton.svelte';
	import SettingsModal from './SettingsModal.svelte';
	interface Props {
		gameLogo: string;
	}

	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
	let showSettings = $state(false);
</script>

<header>
	<div class="header-row">
		{#if gameLogo}
			<div class="logo-container">
				<img src=/data/logot/muistiko_kissat.svg alt="Muistiko logo" />
			</div>
		{/if}

		<nav>
			<div>
				<!-- Kotinappi -->
				<button
					class="home-button"
					onclick={() => (window.location.href = '/')}
					aria-label="Home"
					title="Home"
				>
				</button>

				<!-- Infonappi -->
				<button
					class="info-button"
					onclick={() => (showInfo = true)}
					aria-label="Info"
					title="Info"
				>
				</button>

				<!-- Asetus-nappi -->
				<button
					class="settings-button"
					onclick={() => (showSettings = true)}
					aria-label="Settings"
					title="Settings"
				>
				</button>
				<!-- Ääni-nappi (tulee soundButton.svelte:stä)-->
				<SoundButton />
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
