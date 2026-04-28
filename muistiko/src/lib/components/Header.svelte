<script lang="ts">
	import PeliInfo from '../../routes/peliInfo.svelte';
	import Button from './Button.svelte';
	interface Props {
		pelinLogo: string;
	}

	let { pelinLogo }: Props = $props();
	let naytaInfo = $state(false);
</script>

<header>
	{#if pelinLogo}
		<img src={pelinLogo} alt="" height="75%" />
	{/if}
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
