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
		display: flex;
		align-items: center;
		margin-left: 30px;
		margin-bottom: 100px;
	}
	.slider input {
		cursor: pointer;
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
		filter: var(--color-icon-filter, none);
		cursor: pointer;
	}
</style>
