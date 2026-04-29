export const soundState = $state({
  volume: 0.5,
  muted: true,
  showSlider: false,
  audioElement: null as HTMLAudioElement | null
})



 export function toggleMute() {
  soundState.muted = !soundState.muted
}

export function handleVolume(value: number) {
  soundState.volume = value

  if(!soundState.muted && value > 0) {
    soundState.muted = false
  } else if (value === 0) {
    soundState.muted = true
  }
 
}