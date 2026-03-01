<script lang="ts">
	// 하단 개인정보 처리방침 컴포넌트 가져오기
	import PrivacyFooter from '$lib/components/PrivacyFooter.svelte';

	// 페이지 이동용 함수 (SvelteKit 전용)
	import { goto } from '$app/navigation';

	// 사용자 입력값 및 메시지 상태 관리용 변수들
	let email = '';         // 입력한 이메일 주소
	let message = '';       // 성공 메시지
	let error = '';         // 오류 메시지
	let isLoading = false;  // 로딩 중인지 여부 (버튼 비활성화용)

	// '재설정 링크 보내기' 버튼을 눌렀을 때 실행되는 함수
	async function sendResetEmail() {
		// 이메일 입력 확인 + '@' 포함 여부 확인
		if (!email || !email.includes('@')) {
			error = '올바른 이메일 주소를 입력해주세요.';
			message = '';
			return;
		}

		// 로딩 시작 → 버튼 비활성화
		isLoading = true;
		message = '';
		error = '';

		try {
			// 서버에 이메일 전송 요청
			const res = await fetch('/api/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			// 서버 응답 처리
			const data = await res.json();

			// 성공한 경우 메시지 표시 후 1.5초 후 로그인 페이지로 이동
			if (res.ok) {
				message = data.message;
				setTimeout(() => {
					goto('/login'); // ✅ 로그인 페이지로 이동
				}, 1500);
			} else {
				// 실패 메시지 표시
				error = data.error || '오류가 발생했습니다.';
			}
		} catch {
			// 네트워크 오류 처리
			error = '네트워크 오류가 발생했습니다.';
		} finally {
			isLoading = false; // 로딩 종료
		}
	}
</script>


<style>
	:global(body) {
		margin: 0;
	}

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
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		box-shadow: 0 2px 6px rgba(0,0,0,0.1);
		animation: fadeInDown 0.5s ease-out;
		box-sizing: border-box;
	}

	.navbar a {
		color: white;
		text-decoration: none;
		margin-left: 1rem;
		font-weight: bold;
	}

	.container {
		min-height: 100vh;
		padding: 7rem 2rem 6rem;
		background: #ffffff;
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.8s ease;
	}

	.reset-box {
		background-color: #f5fdec;
		padding: 2.5rem 3rem;
		border-radius: 1.5rem;
		max-width: 500px;
		width: 100%;
		text-align: center;
		box-shadow: 0 2px 6px rgba(0,0,0,0.08);
		animation: fadeInUp 0.6s ease;
	}

	h2 {
		color: #2e7d32;
		font-size: 1.7rem;
		margin-bottom: 1.5rem;
	}

	p {
		font-size: 1rem;
		color: #333;
		margin-bottom: 1.2rem;
		line-height: 1.6;
	}

	input {
		width: 100%;
		padding: 0.8rem 1rem;
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
		padding: 0.8rem 1.5rem;
		border: none;
		border-radius: 1.5rem;
		cursor: pointer;
		font-weight: bold;
		box-shadow: 0 3px 6px rgba(0,0,0,0.1);
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #1b5e20;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.message {
		color: #2e7d32;
		font-size: 0.95rem;
		margin-top: 1rem;
	}

	.error {
		color: red;
		font-size: 0.95rem;
		margin-top: 1rem;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes fadeInDown {
		from { opacity: 0; transform: translateY(-20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (max-width: 768px) {
		.navbar {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>

<!-- 상단 네비게이션 -->
<nav class="navbar">
	<div><strong>엘리 챗봇</strong></div>
	<div>
		<a href="/">홈</a>
		<a href="/login">로그인</a>
		<a href="/register">회원가입</a>
	</div>
</nav>

<!-- 본문 -->
<div class="container">
	<div class="reset-box">
		<h2>비밀번호 재설정</h2>
		<p>가입한 이메일 주소를 입력해주세요.<br>임시 비밀번호가 메일로 전송됩니다.</p>
		<input type="email" bind:value={email} placeholder="이메일 주소 입력" />
		<button on:click={sendResetEmail} disabled={isLoading}>
			{isLoading ? '전송 중...' : '재설정 링크 보내기'}
		</button>

		{#if message}
			<p class="message">{message}</p>
		{/if}
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
</div>

<PrivacyFooter />
