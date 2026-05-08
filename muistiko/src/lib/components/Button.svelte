<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
		class?: string;
		ariaLabel?: string;
	}

	let {
		text,
		onclick,
		disabled = false,
		class: className = '',
		ariaLabel,
		...rest
	}: Props = $props();
</script>

<button class={className} {onclick} {disabled} aria-label={ariaLabel ?? text} {...rest}
	>{text}</button
>
