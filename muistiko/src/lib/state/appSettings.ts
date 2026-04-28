// Tilanhallinta koko sovelluksen asetuksille

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface AppSettings {
	highContrast: boolean;
}

const defaultSettings: AppSettings = {
	highContrast: false
};

function loadSettings(): AppSettings {
	if (!browser) return defaultSettings;
	const stored = localStorage.getItem('appSettings');
	if (stored) {
		try {
			return { ...defaultSettings, ...JSON.parse(stored) };
		} catch {
			return defaultSettings;
		}
	}
	return defaultSettings;
}

function saveSettings(settings: AppSettings) {
	if (browser) {
		localStorage.setItem('appSettings', JSON.stringify(settings));
	}
}

export const appSettings = writable<AppSettings>(loadSettings());

export function updateSettings(newSettings: Partial<AppSettings>) {
	appSettings.update((settings) => {
		const updated = { ...settings, ...newSettings };
		saveSettings(updated);
		return updated;
	});
}
