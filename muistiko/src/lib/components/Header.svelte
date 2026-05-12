<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import GameInfo from '$lib/components/gameInfo.svelte';
	import SoundButton from './soundButton.svelte';
	import SettingsModal from './SettingsModal.svelte';
	import { homePageMusic } from '$lib/state/soundState.svelte';
	import Button from './Button.svelte';
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
				<img
					class="logo-desktop"
					src="/data/logot/muistiko_{gameLogo?.toLowerCase()}.svg"
					alt="Muistiko logo"
				/>
				<img
					class="logo-mobile"
					src="/data/logot/muistiko_{gameLogo?.toLowerCase()}_pieni.svg"
					alt="Muistiko logo"
				/>
			</div>
		{/if}

		<!-- Headerin kiinteät napit, hyödyntävät komponenttia (R) -->
		<nav>
			<div class="header-left">
				<!-- Kotinappi (R) -->
				<Button
					class="home-button"
					onclick={() => {
						homePageMusic();
						goto(resolve('/'));
					}}
					ariaLabel="Home"
					pic="/data/ikonit/koti_nappi.svg"
				/>
				<!-- Ääni-nappi (R) (tulee soundButton.svelte:stä)-->
				<SoundButton />
			</div>
			<div class="header-right">
				<!-- Infonappi -->
				<Button
					class="info-button"
					onclick={() => (showInfo = true)}
					ariaLabel="Info"
					pic="/data/ikonit/peliohjeet_nappi.svg"
				/>
				<!-- Asetus-nappi (R) -->
				<Button
					class="settings-button"
					onclick={() => (showSettings = true)}
					ariaLabel="Settings"
					pic="/data/ikonit/asetukset_nappi.svg"
				/>
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
