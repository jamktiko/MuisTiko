export type ThemeName = 'Kissat' | 'Koirat' | 'Opettajat' | 'TIKO';

type themeColors = {
	background: string;
	// header: string
	//footer: string
	card: string;
	//button: string
	//text: string
};
class themeSetting {
	name: ThemeName;
	music: string;
	colors: themeColors;

	constructor(name: ThemeName, music: string, colors: themeColors) {
		this.name = name;
		this.music = music;
		this.colors = colors;
	}
}

export const Themes: themeSetting[] = [
	new themeSetting('Kissat', '/data/music/villatic_music-cute-cat-256893.mp3', {
		background: '/data/taustat/kissat_tausta.png',
		card: '/data/korttien_takapuolet/kissa_tausta_60.svg'
	}),
	new themeSetting('Koirat', '/data/music/alexguz-happy-dog-day-indie-rock-385939.mp3', {
		background: '/data/taustat/koirat_tausta.png',
		card: '/data/korttien_takapuolet/koirat_60.svg'
	}),
	new themeSetting(
		'Opettajat',
		'/data/music/nourishedbymusic-back-to-school-background-music-163728.mp3',
		{
			background: '/data/taustat/opettajat_tausta_eitxt.png',
			card: '/data/korttien_takapuolet/opettajat_60_new.svg'
		}
	),

	new themeSetting('TIKO', '/data/music/paulyudin-technology-tech-technology-484304.mp3', {
		background: '/data/taustat/tiko_tausta.png',
		card: '/data/korttien_takapuolet/tiko_60_uusi.svg'
	})
	//new themeSetting('Etusivu', '/data/music/music_for_video-waiting-music-116216.mp3')
];

export function getTheme(themename: ThemeName) {
	return Themes.find((t) => t.name === themename);
}
