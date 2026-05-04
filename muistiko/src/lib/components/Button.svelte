<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button class="start-button" style="width: 200px; height: 68px;" {onclick} {disabled}>{text}</button>
