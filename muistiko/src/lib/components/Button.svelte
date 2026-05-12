<script lang="ts">
	interface Props {
		text?: string;
		onclick: () => void;
		disabled?: boolean;
		class?: string;
		ariaLabel?: string;
		pic?: string;
	}

	let {
		text,
		onclick,
		disabled = false,
		class: className = '',
		ariaLabel,
		pic,
		...rest
	}: Props = $props();
</script>

<button class={className} {onclick} {disabled} aria-label={ariaLabel ?? text} {...rest}>
	{#if pic}
		<img src={pic} alt={ariaLabel} />
	{/if}{text}</button
>
