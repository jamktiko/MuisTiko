

type themeColors = {
  background: string
  header: string
  footer: string
  card: string
  button: string
  text: string
}
class themeSetting {
   name: string
  music: string
  colors: themeColors

constructor(name: string, music: string, colors: themeColors) {
this.name = name
this.music = music
this.colors = colors
}
} 

export const Themes: themeSetting[] = [
 new themeSetting('Kissat', '/data/music/villatic_music-cute-cat-256893.mp3', {

 })
 new themeSetting('Koirat','/data/music/alexguz-happy-dog-day-indie-rock-385939.mp3', {

 })
 new themeSetting('Opettajat','data/music/nourishedbymusic-back-to-school-background-music-163728.mp3', {

 })

 new themeSetting('TIKO', '/data/music/paulyudin-technology-tech-technology-484304.mp3', {
  
 })
]