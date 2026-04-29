<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';

	interface Props {
		closeInfo: () => void;
	}

	let { closeInfo }: Props = $props();
</script>

<Modal>
	{#snippet header()}
	<div class="header-content">
		<h1>MuisTiko Info</h1>
		<div class="close-button">
		<Button  onclick={closeInfo} text="×"/>
		</div>
	</div>
	{/snippet}

	{#snippet content()}
		<ul>
			<li>Tarkoitus on saada kerättyä kaikki parit mahdollisimman vähillä siirroilla</li>
			<li>....</li>
			<li>.....</li>
			<li>.....</li>
		</ul>
	{/snippet}

	{#snippet footer()}
		<p>hallootta</p>
	{/snippet}
</Modal>

<style>
	.close-button {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: inherit;
		padding: 0;
		margin: 0;
		
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>