<script lang="ts">
	// SvelteKit에서 다른 페이지로 이동할 때 사용하는 함수
	import { goto } from '$app/navigation';

	// 캐릭터 이미지, 하단 개인정보처리방침, 네비게이션 바
	import character from '$lib/character.png';
	import PrivacyFooter from '$lib/components/PrivacyFooter.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// 로그인한 사용자 정보를 저장하고, 로그아웃할 수 있는 기능
	import { user, logout } from '$lib/auth';

	// 입력한 이메일, 비밀번호를 저장하는 변수
	let email = '';
	let password = '';

	// 서버에서 받은 오류 메시지(로그인 실패 시)를 담을 변수
	let message = '';

	// 로그인 버튼을 눌렀을 때 실행되는 함수
	async function login() {
		// 서버에 이메일과 비밀번호를 보냄
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		// 서버에서 받은 응답을 JSON 형태로 바꿈
		const data = await res.json();

		// 메시지를 보여주기 위해 저장 (성공하든 실패하든)
		message = data.message || data.error;

		// 로그인 성공했을 때 실행됨
		if (res.ok && data.user) {
			// 🔄 예전에는 localStorage에 저장했지만,
			// 🔄 지금은 sessionStorage를 사용해서 탭 닫으면 로그인 정보가 사라지도록 함 (보안 강화)
			sessionStorage.setItem('user', JSON.stringify(data.user));

			// 로그인한 사용자 정보를 앱 전체에서 쓸 수 있게 저장
			user.set(data.user);

			// 화면을 챗봇 페이지로 이동시킴 (페이지 깜빡임 없이 자연스럽게 이동)
			goto('/scanner');
		}
	}
</script>

<Navbar {user} {logout} />

<div class="container">
	<div class="section">
		<img src={character} alt="캐릭터" class="character" />
		<h2>로그인</h2>
		<input type="email" bind:value={email} placeholder="이메일" />
		<input type="password" bind:value={password} placeholder="비밀번호" />
		{#if message}
			<p class="message">{message}</p>
		{/if}
		<button on:click={login}>로그인</button>
		<p class="links">
			<a href="/reset-password" data-sveltekit-prefetch>비밀번호 찾기</a>
			<a href="/register" data-sveltekit-prefetch>회원가입</a>
		</p>
		
	</div>
</div>

<PrivacyFooter />

<style>
	:global(body) { margin: 0; }

	.container {
		min-height: 100vh;
		padding: 7rem 2rem 4rem;
		background: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		animation: fadeIn 0.8s ease;
		box-sizing: border-box;
	}

	.section {
		background-color: #f5fdec;
		padding: 2.5rem 3rem;
		border-radius: 1.5rem;
		max-width: 600px;
		width: 100%;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
		text-align: center;
		animation: fadeInUp 0.6s ease;
	}

	h2 {
		color: #2e7d32;
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
	}

	.character {
		width: 120px;
		margin-bottom: 1rem;
	}

	input {
		width: 100%;
		padding: 0.9rem 1rem;
		margin-bottom: 1rem;
		border-radius: 1rem;
		border: 1px solid #ccc;
		background-color: #f0fbe0;
		font-size: 1rem;
		box-sizing: border-box;
	}

	button {
		background-color: #2e7d32;
		color: white;
		padding: 0.9rem 1.5rem;
		border: none;
		border-radius: 1.5rem;
		cursor: pointer;
		font-weight: bold;
		box-shadow: 0 3px 6px rgba(0,0,0,0.1);
		transition: background-color 0.3s ease;
		margin-top: 0.5rem;
		width: 100%;
		box-sizing: border-box;
	}

	button:hover {
		background-color: #1b5e20;
	}

	.message {
		color: red;
		margin-top: 1rem;
		font-size: 0.95rem;
	}

	.links {
		margin-top: 1rem;
		font-size: 0.9rem;
		color: #444;
		text-align: center;
	}

	.links a {
		margin: 0 0.5rem;
		text-decoration: underline;
		color: #444;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>