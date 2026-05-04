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

// Tarvittaessa tyhjennysominaisuus local storagelle (B)
export function clearStorage() {
	localStorage.clear();
}
