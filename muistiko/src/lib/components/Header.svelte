<script lang="ts">
	import GameInfo from '../../routes/gameInfo.svelte';
	import SettingsModal from './SettingsModal.svelte';
	import Button from './Button.svelte';
	interface Props {
		gameLogo: string;
	}

	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
	let showSettings = $state(false);
</script>

<header>
	{#if gameLogo}
		<img src={gameLogo} alt="" height="75%" />
	{/if}
	<nav>
		<div class="navigation">
			<div class="homebutton">
				<Button text="Home" onclick={() => (window.location.href = '/')} />
			</div>

			<div class="infobutton">
				<Button text="info" onclick={() => (showInfo = true)} />
			</div>

			<div class="settingsbutton">
				<Button text="Asetukset" onclick={() => (showSettings = true)} />
			</div>
		</div>
	</nav>

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
	{/if}

	{#if showSettings}
		<SettingsModal closeModal={() => (showSettings = false)} />
	{/if}
</header>

<style>
	header {
		padding: 2rem;
		background-color: #aaa;
		height: 150px;
	}

	img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}

	.infobutton {
		border: 2px solid black;
	}

	nav {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
