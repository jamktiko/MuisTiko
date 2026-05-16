<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { soundState } from '$lib/state/soundState.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Button.svelte';
	//import {setMusicToStorage} from '$lib/localstorage/localstorage'
	const aloitaPeli = async () => {
		const audio = soundState.audioElement;
		if (audio) {
			audio.pause();
			audio.src = '/data/music/music_for_video-waiting-music-116216.mp3';
			audio.load();
			try {
				await audio.play();
				soundState.muted = false;
				//setMusicToStorage(audio.src);
			} catch (error) {
				console.log('Virhe', error);
			}
		}
		goto(resolve('/settings'));
	};
</script>

<div class="landing-page">
	<Header gameLogo="" />
	<main class="landing-main">
		<div class="main-content">
			<div class="content-box">
				<div class="logo">
					<img src="/data/logot/muistiko.svg" alt="Muistiko logo" />
				</div>
				<Button
					text="ALOITA PELI"
					class="start-button"
					onclick={aloitaPeli}
					ariaLabel="Aloita peli"
				/>
			</div>
		</div>
	</main>
	<Footer />
</div>
