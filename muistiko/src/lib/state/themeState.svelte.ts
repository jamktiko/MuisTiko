

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

/*export const Themes: themeSetting[] = [
 new themeSetting('Kissat', 'villatic_music-cute-cat-256893.mp3', {

 }

 )
]*/