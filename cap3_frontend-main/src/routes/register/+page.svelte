<script lang="ts">
	// 엘리 캐릭터 이미지, 하단바, 상단 네비게이션 바 가져오기
	import character from '$lib/character.png';
	import PrivacyFooter from '$lib/components/PrivacyFooter.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// 로그인 상태 및 로그아웃 기능을 위한 store
	import { user, logout } from '$lib/auth';

	// 사용자가 입력할 정보들 (이름, 이메일, 비밀번호)
	let name = '';
	let email = '';
	let password = '';

	// 서버에서 받은 메시지를 표시할 변수 (성공 또는 에러)
	let message = '';

	// "가입하기" 버튼을 눌렀을 때 실행되는 함수
	async function register() {
		// 사용자가 입력한 정보를 서버에 전송
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
		});

		// 서버 응답 결과를 저장
		const data = await res.json();
		message = data.message || data.error;

		// 가입 성공 시 로그인 페이지로 이동
		if (res.ok) {
			window.location.href = '/login'; // 🔄 나중에는 goto('/login') 사용 가능
		}
	}
</script>


<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #f4fff4, #e8f5e9);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 5vh;
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		box-sizing: border-box;
	}

	.register-wrapper {
		display: flex;
		align-items: center;
		background-color: white;
		padding: 3rem 4rem;
		border-radius: 2rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 800px;
		gap: 2rem;
	}

	.character {
		width: 130px;
		height: auto;
	}

	.register-form {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1.2rem;
	}

	h2 {
		color: #2e2e2e;
		margin-bottom: 1rem;
		font-size: 1.8rem;
	}

	input {
		padding: 0.9rem 1.2rem;
		border: none;
		border-radius: 1rem;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		width: 100%;
		background-color: #f0fbe0;
		font-size: 1rem;
	}

	input::placeholder {
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		color: #777;
	}

	button {
		background-color: #2e7d32;
		color: white;
		padding: 0.9rem 1.5rem;
		border: none;
		border-radius: 1.5rem;
		cursor: pointer;
		align-self: flex-end;
		font-weight: bold;
		box-shadow: 0 3px 6px rgba(0,0,0,0.1);
	}

	button:hover {
		background-color: #1b5e20;
	}

	.links {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: #444;
		text-align: center;
	}

	.links a {
		margin: 0 0.5rem;
		text-decoration: underline;
		color: #444;
	}
</style>

<Navbar {user} {logout} />

<div class="container">
	<div class="register-wrapper">
		<img src={character} alt="캐릭터" class="character" />
		<div class="register-form">
			<h2>회원가입</h2>
			<input type="text" bind:value={name} placeholder="이름" />
			<input type="email" bind:value={email} placeholder="이메일" />
			<input type="password" bind:value={password} placeholder="비밀번호" />
			{#if message}
				<p style="color: red; font-size: 0.9rem;">{message}</p>
			{/if}
			<button on:click={register}>가입하기</button>
			<p class="links">
				<a href="/login">이미 계정이 있으신가요? 로그인</a>
			</p>
		</div>
	</div>
</div>

<PrivacyFooter />