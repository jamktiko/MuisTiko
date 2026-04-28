<script lang="ts">
  import {soundState, toggleMute, handleVolume} from '$lib/state/soundState.svelte';

  let audio: HTMLAudioElement

  $effect(() =>{
    if (audio) {
      audio.volume = soundState.volume
      audio.muted = soundState.muted
    }
  })

  function volumeInput(e: Event) {
    const target = e.target as HTMLInputElement;
    handleVolume(Number(target.value));
  }
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div  
  onmouseenter={() => soundState.showSlider = true}
  onmouseleave={() => soundState.showSlider = false}
> 
 
 <button onclick={toggleMute}>
    {soundState.muted ? "🔇" : "🔊"}
  </button>
 

{#if soundState.showSlider && !soundState.muted}
<input type="range"
class="slider"
min="0"
max="1"
step="0.01"
value={soundState.volume}
oninput={volumeInput}/>
{/if}

<audio bind:this={audio} src="\data\music\fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3"/>
</div>

<style>
 .slider {
   position: absolute;
  top: 85px;
  left: 54.5%;  
  
 
  padding: 10px;
  border-radius: 12px;
  -webkit-appearance: slider-vertical;
   writing-mode: bottom;
  display: flex;
  align-items: center;
  
 }


</style>