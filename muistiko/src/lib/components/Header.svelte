<script lang="ts">
	import GameInfo from '../../routes/gameInfo.svelte';
	import Button from './Button.svelte';
	import SoundButton from '../../routes/soundButton.svelte';
	interface Props {
		gameLogo: string;
	}

	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
</script>

<header>
	{#if gameLogo}
		<img src={gameLogo} alt="" height="75%" />
	{/if}
	<Button text="info" onclick={() => (showInfo = true)} />
	<SoundButton/>

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
	{/if}
</header>

<style>
	header {
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #aaa;
		height: 150px;
	}

	img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
</style>
