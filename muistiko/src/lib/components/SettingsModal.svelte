<script lang="ts">
	import Modal from './Modal.svelte';

	import { appSettings, updateSettings } from '../state/appSettings.ts';

	interface Props {
		closeModal: () => void;
	}

	let { closeModal }: Props = $props();
	let highContrast = $state(false);

	$effect(() => {
		highContrast = $appSettings.highContrast;
	});

	function handleHighContrastToggle(event: Event) {
		const target = event.target as HTMLInputElement;
		updateSettings({ highContrast: target.checked });
	}
</script>

<Modal>
	{#snippet header()}
		<div class="header-content">
			<h1>Asetukset</h1>
			<button class="close-button" onclick={closeModal} aria-label="Sulje">×</button>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="settings-content">
			<div class="toggle-container">
				<label for="high-contrast-toggle">Korkea kontrasti</label>
				<label class="toggle">
					<input
						id="high-contrast-toggle"
						type="checkbox"
						bind:checked={highContrast}
						onchange={handleHighContrastToggle}
					/>
					<span class="slider"></span>
				</label>
			</div>
		</div>
	{/snippet}
</Modal>

<style>
	.settings-content {
		padding: 1rem;
	}

	.toggle-container {
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		gap: 20px;
	}

	.toggle {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}
</style>
