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
		<img src="/data/ikonit/volumeoff.svg" alt="Volume off" />
		{:else}
		<img src="/data/ikonit/volume.svg" alt="Volume on" />
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
		top: 170%;
		left: 50%;
		padding: 10px;
		border-radius: 12px;
		-webkit-appearance: slider-vertical;
		transform: translateX(-50%) rotate(90deg);
		display: flex;
		align-items: center;
	}
	.audio {
		display: inline-block;
		position: relative;
	}
</style>
