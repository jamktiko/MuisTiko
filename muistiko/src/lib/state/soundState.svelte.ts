import type { ThemeName } from "./themeState.svelte"
import { getTheme } from "./themeState.svelte";
import { setMusicToStorage } from "$lib/localstorage/localstorage";

export const soundState = $state({
  volume: 0.3,
  muted: true,
  showSlider: false,
  audioElement: null as HTMLAudioElement | null
})

export function changeMusic(theme: ThemeName) {
  const audio = soundState.audioElement
  if (!audio) return

  const themeMusic = getTheme(theme)
  if (!themeMusic) return

 audio.pause()
  audio.src = themeMusic.music
  audio.load()

  setMusicToStorage(themeMusic.music)
 

  if (!soundState.muted) {
    audio.play()
  }
}
  


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

export function homePageMusic() {
  const audio = soundState.audioElement
  if(!audio) return
    audio.pause()
    audio.src = 'data/music/music_for_video-waiting-music-116216.mp3'
    audio.load()

    if (!soundState.muted) {
      audio.play()
    }
  
}