<script lang="ts">
<<<<<<< HEAD
	import PeliInfo from '../../routes/peliInfo.svelte';
=======
	import GameInfo from '../../routes/gameInfo.svelte';
>>>>>>> 1a2e464b40f71225e860539e6ed4a0b26a4ecd26
	import Button from './Button.svelte';
	interface Props {
		gameLogo: string;
	}

<<<<<<< HEAD
	let { pelinLogo }: Props = $props();
	let naytaInfo = $state(false);
=======
	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
>>>>>>> 1a2e464b40f71225e860539e6ed4a0b26a4ecd26
</script>

<header>
	{#if gameLogo}
		<img src={gameLogo} alt="" height="75%" />
	{/if}
<<<<<<< HEAD
	<nav>
		<div class="navigation">
			<div class="homebutton">
				<Button text="Home" onclick={() => (window.location.href = '/')} />
			</div>

			<div class="infobutton">
				<Button text="info" onclick={() => (naytaInfo = true)} />
			</div>
		</div>
	</nav>

	{#if naytaInfo}
		<PeliInfo suljeInfo={() => (naytaInfo = false)} />
=======
	<Button text="info" onclick={() => (showInfo = true)} />

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
>>>>>>> 1a2e464b40f71225e860539e6ed4a0b26a4ecd26
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
