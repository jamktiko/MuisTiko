// Funktiot asettavat sisällöt local storageen (B)
// Asettaa teeman (B)
export function setThemeToStorage(item: string) {
	localStorage.setItem('theme', item.toString());
}
// Asettaa aikarajan (B)
export function setTimelimitToStorage(item: string) {
	localStorage.setItem('timelimit', item.toString());
}
// Asettaa korttien määrän (B)
export function setDifficultyToStorage(item: string) {
	localStorage.setItem('difficulty', item.toString());
}
// Asettaa musiikin
export function setMusicToStorage(item: string) {
	localStorage.setItem('Audio', item.toString())
}
export function setMuteToStorage(item: boolean) {
	localStorage.setItem('Muted', item.toString())
}

// Funktiot hakevat sisällöt local storagesta (B)
// Lataa teeman (B)
export function loadThemeFromStorage() {
	return localStorage.getItem('theme');
}
// Lataa aikarajan (B)
export function loadTimelimitFromStorage() {
	return localStorage.getItem('timelimit');
}
// Lataa korttien määrän (B)
export function loadDifficultyFromStorage() {
	return localStorage.getItem('difficulty');
}
// lataa musiikin
export function loadMusicFromStorage() {
	return localStorage.getItem('Audio')
}
export function LoadMuteToStorage() {
	return localStorage.getItem('Muted')
}

// Tarvittaessa tyhjennysominaisuus local storagelle (B)
export function clearStorage() {
	localStorage.clear();
}


