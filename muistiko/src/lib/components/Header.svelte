<script lang="ts">
 import PeliInfo from "../../routes/peliInfo.svelte";
 import Button from "./Button.svelte";
	interface Props {
		pelinLogo: string;
	}

	let { pelinLogo }: Props = $props();
	let naytaInfo = $state(false)
</script>

<header>
	{#if pelinLogo}
		<img src={pelinLogo} alt="" height="75%" />
	{/if}
	<Button text="info" onclick={()=>naytaInfo = true} />
	
 {#if naytaInfo}
 <PeliInfo  suljeInfo={()=> naytaInfo = false}/>

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
