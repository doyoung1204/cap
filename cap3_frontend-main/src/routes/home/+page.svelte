<script lang="ts">
	import character from '$lib/character.png';
	import PrivacyFooter from '$lib/components/PrivacyFooter.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<div class="hero">
		<img src={character} alt="캐릭터" class="hero-image" />
		<div class="hero-text">
			<p>알레르기 걱정, <b>이제 엘리에게 맡기세요!</b></p>
			<p>가공식품의 성분표 이미지를 업로드하면,<br />
			챗봇이 자동으로 성분을 추출하고<br />
			당신의 알레르기 정보와 즉시 비교해드립니다.</p>
			<button class="chat-button" on:click={() => goto('/login')}>
				👉 지금 시작하기
			</button>
		</div>
	</div>

	<div class="section">
		<h2>엘리가 도와드립니다!</h2>
		<p>✅ 챗봇이 가공식품의 성분표에서 자동으로 텍스트를 추출해요.</p>
		<p>✅ 알레르기 성분과 자동으로 비교해 결과를 알려줘요.</p>
		<p>✅ 로그인만 하면, 매번 성분 입력 없이 빠르게 확인할 수 있어요.</p>
		<p>✅ 더 이상 걱정하지 마세요. 엘리가 함께 합니다.</p>
		<br />
		<p>지금 바로 시작해보세요. 안전한 식생활을 챗봇과 함께!</p>
	</div>
</div>

<PrivacyFooter />

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		background-color: #fff;
	}

	.container {
		min-height: 100vh;
		padding: 6rem 1.5rem 5rem;
		box-sizing: border-box;
		animation: fadeIn 0.8s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.hero {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		flex-wrap: wrap;
		text-align: center;
		width: 100%;
		max-width: 1024px;
	}

	.hero-image {
		width: clamp(150px, 25vw, 200px);
		flex-shrink: 0;
	}

	.hero-text {
		max-width: 600px;
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		line-height: 1.8;
	}

	.hero-text b {
		color: #2e7d32;
		font-size: clamp(1.2rem, 3vw, 1.4rem);
	}

	.chat-button {
		margin-top: 1rem;
		padding: 0.8rem 1.5rem;
		background-color: #2e7d32;
		color: white;
		border: none;
		border-radius: 1.5rem;
		font-weight: bold;
		box-shadow: 0 3px 6px rgba(0,0,0,0.1);
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-size: 1rem;
		width: auto;
	}

	.chat-button:hover {
		background-color: #1b5e20;
	}

	.section {
		background-color: #f5fdec;
		padding: 2rem 1.5rem;
		border-radius: 1.5rem;
		width: 100%;
		max-width: 900px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.05);
		animation: fadeInUp 0.6s ease;
	}

	.section h2 {
		color: #2e7d32;
		font-size: clamp(1.4rem, 4vw, 1.8rem);
		margin-bottom: 1.2rem;
		text-align: center;
	}

	.section p {
		margin-bottom: 0.6rem;
		font-size: clamp(0.95rem, 2.5vw, 1rem);
		color: #333;
		text-align: center;
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
