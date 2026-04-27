<script lang="ts">
	const aloitaPeli = () => {
		window.location.href = '/settings';
	};
</script>

<div class="landing-page">
	<main class="main-content">
		<div class="intro">
			<div class="logo">muisTIKO?</div>
			<p>Tähän tekstiä</p>
		</div>
		<button class="start-button" onclick={aloitaPeli}> PELAA </button>
	</main>

	<footer class="footer">
		<p>&copy; 2026 Tietojenkäsittelyn Ohjelmistoprojekti Ryhmä 6</p>
	</footer>
</div>

<style>
	.landing-page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.logo {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.intro {
		text-align: center;
		margin-bottom: 2rem;
	}

	.intro p {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		color: rgb(34, 33, 33) e0e;
	}

	.start-button {
		background: #aaa;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.5rem;
		color: black;
		font-weight: bold;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.start-button:hover {
		transform: scale(1.05);
	}

	.start-button:active {
		transform: scale(0.98);
	}

	.footer {
		background-color: #aaa;
		padding: 1.5rem;
		text-align: center;
		font-size: 0.9rem;
	}

	.footer p {
		margin: 0;
		color: black;
	}
</style>
