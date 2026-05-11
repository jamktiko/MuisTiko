// Funktiot, jotka tallentavat ja hakevat tietoja local storagesta (B)
// Tallentaa teeman (B)
export function setThemeToStorage(item: string) {
	localStorage.setItem('theme', item.toString());
}
// Tallentaa aikarajan (B)
export function setTimelimitToStorage(item: string) {
	localStorage.setItem('timelimit', item.toString());
}
// Tallentaa korttien määrän (B)
export function setDifficultyToStorage(item: string) {
	localStorage.setItem('difficulty', item.toString());
}
// Tallentaa musiikin
export function setMusicToStorage(item: string) {
	localStorage.setItem('Audio', item.toString());
}
export function setMuteToStorage(item: boolean) {
	localStorage.setItem('Muted', item.toString());
}

// Funktiot hakevat sisällöt local storagesta (B)
// Hakee teeman (B)
export function loadThemeFromStorage() {
	return localStorage.getItem('theme');
}
// Hakee aikarajan (B)
export function loadTimelimitFromStorage() {
	return localStorage.getItem('timelimit');
}
// Hakee korttien määrän (B)
export function loadDifficultyFromStorage() {
	return localStorage.getItem('difficulty');
}
// Hakee musiikin (V)
export function loadMusicFromStorage() {
	return localStorage.getItem('Audio');
}
export function loadMuteFromStorage() {
	return localStorage.getItem('Muted');
}

// Tarvittaessa tyhjennysominaisuus local storagelle (B)
export function clearStorage() {
	localStorage.clear();
}
