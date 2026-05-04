<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		header?: Snippet;
		content?: Snippet;
		footer?: Snippet;
	}

	let { header, content, footer }: Props = $props();

	import { fly } from 'svelte/transition';
</script>

<div class="backdrop"></div>

<div class="modal" transition:fly={{ y: -300, delay: 50, duration: 500 }}>
	<header>
		{@render header?.()}
	</header>

	{@render content?.()}

	<footer>
		{@render footer?.()}
	</footer>
</div>
