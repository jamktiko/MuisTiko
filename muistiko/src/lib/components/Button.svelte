<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button {onclick} {disabled}>{text}</button>

<style>
	button {
		font-family: Arial, sans-serif;
		font-size: 1.2rem;
		margin: 10px;
		padding: 10px 20px;
		background-color: var(--main-color);
		color: black;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		min-width: 15rem;
	}

	button:hover {
		background-color: rgba(0, 0, 0, 0.25);
	}
</style>
