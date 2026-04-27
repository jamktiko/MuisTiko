<script lang="ts">
	let { teksti, placeholder, optiot } = $props();

	let valittu = $state('');
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label>{teksti}</label><br />

	<select bind:value={valittu}>
		<option disabled value="">
			{placeholder}
		</option>

		{#each optiot as optio (optio)}
			<option value={optio}>
				{optio}
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
