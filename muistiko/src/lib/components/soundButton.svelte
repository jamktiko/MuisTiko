<script lang="ts">
	import { soundState, toggleMute, handleVolume } from '$lib/state/soundState.svelte';

	$effect(() => {
		if (soundState.audioElement) {
			soundState.audioElement.volume = soundState.volume;
			soundState.audioElement.muted = soundState.muted;
		}
	});

	function volumeInput(e: Event) {
		const target = e.target as HTMLInputElement;
		handleVolume(Number(target.value));
	}

	function handleSound() {
		const clickMuted = !soundState.muted;
		toggleMute();

		if (!clickMuted && soundState.audioElement) {
			soundState.audioElement.play();
		} else if (soundState.audioElement) {
			soundState.audioElement.pause();
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="audio"
	onmouseenter={() => (soundState.showSlider = true)}
	onmouseleave={() => (soundState.showSlider = false)}
>
	<button onclick={handleSound}>
		{#if soundState.muted}
			<img src="/data/ikonit/volumeoff.svg" alt="Volume off" class="volume-off" />
		{:else}
			<img src="/data/ikonit/volume.svg" alt="Volume on" class="volume-on" />
		{/if}
	</button>

	{#if soundState.showSlider && !soundState.muted}
		<div class="slider">
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={soundState.volume}
				oninput={volumeInput}
			/>
		</div>
	{/if}
</div>

<style>
	.slider {
		position: absolute;
		appearance: slider-vertical;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 10;
		background-color: var(--color-nappi, #f0ece2);
		padding: 15px 10px;
		border-radius: 20px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		border: 2px solid #dcd7cc;
		margin-top: 5px;
	}

	.slider input {
		cursor: pointer;
		appearance: slider-vertical;
		width: 15px;
		height: 100px;
		margin: 0;
	}

	.slider::after {
		content: '';
		position: absolute;
		top: -10px;
		left: 0;
		right: 0;
		height: 20px;
		background: transparent
	}

	.audio {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30px;
		height: 30px;
	}
	.volume-on {
		width: 30px;
		height: 30px;
		background-color: transparent;
		filter: var(--color-icon-filter, none);
		cursor: pointer;
	}
	.volume-off {
		width: 30px;
		height: 30px;
		background-color: transparent;
		/*filter: var(--color-icon-filter, none);*/
		cursor: pointer;
	}
</style>
