// Tilanhallinta koko sovelluksen asetuksille (B)

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Sovelluksen asetukset, tällä hetkellä vain korkean kontrastin tila (B)
export interface AppSettings {
	highContrast: boolean;
}

// Oletusasetukset, jos localStoragesta ei löydy tallennettuja asetuksia (B)
const defaultSettings: AppSettings = {
	highContrast: false
};

// Asetusten lataus localStoragesta (B)
function loadSettings(): AppSettings {
	if (!browser) return defaultSettings;
	const stored = localStorage.getItem('appSettings');
	if (stored) {
		try {
			// Varmistetaan, että tallennettu data on oikean muotoista (B)
			return { ...defaultSettings, ...JSON.parse(stored) };
		} catch {
			return defaultSettings;
		}
	}
	return defaultSettings;
}
// Asetusten tallennus localStorageen (B)
function saveSettings(settings: AppSettings) {
	if (browser) {
		// Varmistetaan, että tallennetaan vain oikean muotoista dataa (B)
		localStorage.setItem('appSettings', JSON.stringify(settings));
	}
}
// Svelte store asetuksille, joka käyttää lataus- ja tallennusfunktioita (B)
export const appSettings = writable<AppSettings>(loadSettings());

// Asetusten päivitysfunktio, joka yhdistää vanhat ja uudet asetukset ja tallentaa ne (B)
export function updateSettings(newSettings: Partial<AppSettings>) {
	appSettings.update((settings) => {
		const updated = { ...settings, ...newSettings };
		saveSettings(updated);
		return updated;
	});
}
