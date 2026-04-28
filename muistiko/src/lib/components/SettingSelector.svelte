<script lang="ts">
	// onchange muokattu
	let { text, placeholder, options, onChange, value = '' } = $props();

	let chosen = $state('');

	$effect(() => {
		chosen = value;
	});
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label>{text}</label><br />

	<select bind:value={chosen} onchange={() => onChange?.(chosen)}>
		<option disabled value="">
			{placeholder}
		</option>

		{#each options as option (option)}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</div>

<style>
	.dropdown {
		border: 2px solid black;
		padding: 0.5rem;
		border-radius: 8px;
	}

	select {
		width: 100%;
	}
</style>
