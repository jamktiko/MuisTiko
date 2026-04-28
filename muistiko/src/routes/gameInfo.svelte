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
		<h1>MuisTiko Info</h1>
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
		<Button text="Sulje" onclick={closeInfo} />
	{/snippet}
</Modal>
