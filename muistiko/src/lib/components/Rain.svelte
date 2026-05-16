<!-- Häviömodalin sadeefekti luotu puhtaalla CSS, verkosta katottu malli, olisi voinut funktioillakin tehdä (R)-->

<div class="rain">
	<span></span><span></span><span></span><span></span><span></span>
	<span></span><span></span><span></span><span></span><span></span>
	<span></span><span></span><span></span><span></span><span></span>
</div>

<style>
	.rain {
		position: fixed;
		inset: 0;
		pointer-events: none;
	}

	/* Yksi sadepisara */
	.rain span {
		position: absolute;
		top: -10%;
		width: 2px;
		height: 15px;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 1px;
		animation: rain-fall linear infinite;
	}

	/* Satunnaisuus */
	.rain span:nth-child(1) {
		left: 5%;
		animation-duration: 0.8s;
		animation-delay: -0.2s;
	}
	.rain span:nth-child(2) {
		left: 12%;
		animation-duration: 1.1s;
		animation-delay: -0.6s;
	}
	.rain span:nth-child(3) {
		left: 20%;
		animation-duration: 0.9s;
		animation-delay: -0.4s;
	}
	.rain span:nth-child(4) {
		left: 28%;
		animation-duration: 1.3s;
		animation-delay: -1s;
	}
	.rain span:nth-child(5) {
		left: 35%;
		animation-duration: 0.7s;
		animation-delay: -0.3s;
	}

	.rain span:nth-child(6) {
		left: 42%;
		animation-duration: 1s;
		animation-delay: -0.8s;
	}
	.rain span:nth-child(7) {
		left: 50%;
		animation-duration: 0.9s;
		animation-delay: -0.4s;
	}
	.rain span:nth-child(8) {
		left: 58%;
		animation-duration: 1.2s;
		animation-delay: -0.9s;
	}
	.rain span:nth-child(9) {
		left: 65%;
		animation-duration: 0.8s;
		animation-delay: -0.5s;
	}
	.rain span:nth-child(10) {
		left: 72%;
		animation-duration: 1.4s;
		animation-delay: -1.1s;
	}

	.rain span:nth-child(11) {
		left: 78%;
		animation-duration: 0.9s;
		animation-delay: -0.6s;
	}
	.rain span:nth-child(12) {
		left: 83%;
		animation-duration: 1.1s;
		animation-delay: -0.7s;
	}
	.rain span:nth-child(13) {
		left: 88%;
		animation-duration: 0.7s;
		animation-delay: -0.3s;
	}
	.rain span:nth-child(14) {
		left: 93%;
		animation-duration: 1.3s;
		animation-delay: -1s;
	}
	.rain span:nth-child(15) {
		left: 97%;
		animation-duration: 0.8s;
		animation-delay: -0.5s;
	}

	/* Putous */
	@keyframes rain-fall {
		from {
			transform: translateY(0);
			opacity: 0.8;
		}
		to {
			transform: translateY(110vh);
			opacity: 0.2;
		}
	}
</style>
