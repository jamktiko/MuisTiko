<script lang="ts">
	import GameInfo from '$lib/components/gameInfo.svelte'
	import SoundButton from './soundButton.svelte';
	import SettingsModal from './SettingsModal.svelte';
	interface Props {
		gameLogo: string;
	}

	let { gameLogo }: Props = $props();
	let showInfo = $state(false);
	let showSettings = $state(false);
</script>

<header>
	<div class="header-row">
		{#if gameLogo}
			<div class="logo-container">
				<img src={gameLogo} alt="" />
			</div>
		{/if}

		<nav>
			<div class="navigation">
				<button
					class="icon-button"
					onclick={() => (window.location.href = '/')}
					aria-label="Home"
					title="Home"
				>
					<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
						<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
					</svg>
				</button>
				<button
					class="icon-button"
					onclick={() => (showInfo = true)}
					aria-label="Info"
					title="Info"
				>
					<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
						<path
							d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zm1-5C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4z"
						/>
					</svg>
				</button>
				<button
					class="icon-button"
					onclick={() => (showSettings = true)}
					aria-label="Settings"
					title="Settings"
				>
					<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
						<path
							d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.46A.5.5 0 0 0 14.5 3h-5a.5.5 0 0 0-.49.42l-.36 2.46c-.59.22-1.14.52-1.62.94l-2.39-.96a.5.5 0 0 0-.61.22L2.8 8.88a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.92 14.5a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.44.34.7.22l2.39-.96c.48.42 1.03.72 1.62.94l.36 2.46c.05.28.28.48.57.48h5c.29 0 .52-.2.57-.48l.36-2.46c.59-.22 1.14-.52 1.62-.94l2.39.96c.26.11.56.02.7-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5z"
						/>
					</svg>
				</button>
				<SoundButton/>
			</div>
		</nav>
	</div>

	{#if showInfo}
		<GameInfo closeInfo={() => (showInfo = false)} />
	{/if}

	{#if showSettings}
		<SettingsModal closeModal={() => (showSettings = false)} />
	{/if}
</header>

<style>
	header {
		padding: 1.5rem 2rem;
		background-color: #aaa;
	}

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.logo-container {
		flex: 0 0 auto;
		max-width: 240px;
	}

	.logo-container img {
		max-height: 80px;
		max-width: 100%;
		object-fit: contain;
	}

	nav {
		flex: 1 1 auto;
	}

	.navigation {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.icon-button {
		width: 44px;
		height: 44px;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.85);
		color: #333;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
	}

	.icon-button:hover {
		background: #fff;
		transform: translateY(-1px);
	}

	.icon-button svg {
		width: 20px;
		height: 20px;
	}
</style>
