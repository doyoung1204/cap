<script lang="ts">
	import { type Writable } from 'svelte/store';
	export let user: Writable<{ name: string; email: string } | null>;
	export let logout: () => void;

	let isMenuOpen = false;
</script>

<nav class="navbar">
	<div class="logo">
		<a href="/">엘리멘탈</a>
	</div>

	<!-- 햄버거 버튼 (모바일 전용) -->
	<button class="menu-toggle" on:click={() => isMenuOpen = !isMenuOpen}>
		☰
	</button>

	<div class="links" class:open={isMenuOpen}>
		<a href="/" class="btn">홈</a>
		{#if $user}
			<a href="/scanner" class="btn">챗봇</a>
			<button type="button" class="btn" on:click={logout}>로그아웃</button>
		{:else}
			<a href="/login" class="btn btn-primary">로그인</a>
			<a href="/register" class="btn">회원가입</a>
		{/if}
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #2e7d32;
		color: white;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
	}

	.logo a {
		color: white;
		font-weight: bold;
		text-decoration: none;
		font-size: clamp(1rem, 2vw, 1.4rem);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn {
		padding: 0.4rem 1rem;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
		border: none;
		color: white;
		text-decoration: none;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.2s ease;
		font-size: 0.95rem;
		white-space: nowrap;
	}

	.btn:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.btn-primary {
		background-color: #66bb6a;
	}

	.btn-primary:hover {
		background-color: #5aa85c;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: block;
		}

		.links {
			position: absolute;
			top: 100%;
			right: 0;
			background-color: #2e7d32;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
			display: none;
			padding: 1rem 2rem;
		}

		.links.open {
			display: flex;
		}

		.btn {
			width: 100%;
			text-align: left;
			margin-bottom: 0.5rem;
		}
	}
</style>
