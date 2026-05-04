export type ThemeName = 'Kissat' | 'Koirat' | 'Opettajat' | 'TIKO'

type themeColors = {
  background: string
 // header: string
  //footer: string
  card: string
  //button: string
  //text: string
}
class themeSetting {
   name: ThemeName
  music: string
  colors: themeColors

constructor(name: ThemeName, music: string, colors: themeColors) {
this.name = name
this.music = music
this.colors = colors
}
} 

export const Themes: themeSetting[] = [
 new themeSetting('Kissat', '/data/music/villatic_music-cute-cat-256893.mp3', {
  background: "/data/taustat/kissa_iso_tausta.svg",
  card: "/data/korttien_takapuolet/kissa_80.svg"

 }),
 new themeSetting('Koirat','/data/music/alexguz-happy-dog-day-indie-rock-385939.mp3', {
  background: "/data/taustat/koira_iso_tausta.svg",
   card: "/data/korttien_takapuolet/koira_80.svg"
 }),
 new themeSetting('Opettajat','/data/music/nourishedbymusic-back-to-school-background-music-163728.mp3', {
  background: "/data/taustat/opettajat_iso_tausta.svg",
   card: "/data/korttien_takapuolet/opettajat_80.svg"
 }),

 new themeSetting('TIKO', '/data/music/paulyudin-technology-tech-technology-484304.mp3', {
  background: "/data/taustat/tiko_iso_tausta.svg",
   card: "/data/korttien_takapuolet/tiko_80.svg"
 }),
//new themeSetting('Etusivu', '/data/music/music_for_video-waiting-music-116216.mp3')
]

export function getTheme(themename: ThemeName) {
  return Themes.find(t => t.name === themename)
}