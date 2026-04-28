<script lang="ts">
	import GameInfo from '../../routes/gameInfo.svelte';
	import Button from './Button.svelte';
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
	<nav>
		<div class="navigation">
			<div class="infobutton">
				<Button text="info" onclick={() => (showInfo = true)} />
			</div>
		</div>
	</nav>

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
		<Button text="info" onclick={() => (showInfo = true)} />
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
