<script lang="ts">
	// onchange muokattu
	let { text, placeholder, options, onChange, value = '' } = $props();

	let chosen = $state('');

	$effect(() => {
		chosen = value;
	});
</script>

<!-- Dropdown-valikko (R) -->
<div class="dropdown">
	<!-- svelte-ignore a11y_label_has_associated_control -->
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

