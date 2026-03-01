<script>
	let showModal = false; // 모달 열림 상태 제어
</script>

<style>
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: left;
		padding: 1rem 2rem;
		background-color: #f5fdec;
		box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
		z-index: 10;
	}

	.privacy-btn {
		background-color: #c9f2b6;
		border-radius: 1rem;
		padding: 0.4rem 1rem;
		font-size: 0.8rem;
		cursor: pointer;
		display: inline-block;
		border: none;
		font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		overflow-y: auto;
		max-height: 80vh;
	}

	.modal h2 {
		margin-bottom: 1rem;
		font-size: 1.2rem;
		color: #2e7d32;
	}

	.modal p {
		font-size: 0.9rem;
		margin-bottom: 0.8rem;
	}

	.modal button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #2e7d32;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>

<!-- 하단 고정 개인정보처리방침 버튼 -->
<div class="footer">
	<button type="button" class="privacy-btn" on:click={() => showModal = true}>
		개인정보처리방침
	</button>
</div>

{#if showModal}
	<!-- 오버레이 배경 (클릭 및 키보드로 닫기 가능) -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="modal-overlay"
		role="presentation"
		aria-hidden="true"
		tabindex="0"
		on:click={() => showModal = false}
		on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') showModal = false; }}>

		<!-- 모달 본문 -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			on:click|stopPropagation>
			
			<h2>개인정보처리방침</h2>
			<p>본 서비스는 사용자의 개인정보 보호를 매우 중요하게 생각하며, </p> 
            <p>「개인정보 보호법」 등 관련 법령을 준수합니다.</p>
			<p><strong>1. 수집 항목:</strong> 이름, 이메일, 비밀번호, 접속 기록</p>
			<p><strong>2. 이용 목적:</strong> 사용자 인증, 챗봇 서비스 제공</p>
			<p><strong>3. 보유 기간:</strong> 회원 탈퇴 시 즉시 파기</p>
			<p><strong>4. 제3자 제공:</strong> 없음</p>
			<p><strong>5. 권리:</strong> 개인정보 열람/정정/삭제 요청 가능</p>
			<p><strong>6. 책임자:</strong> ex 김교연 (gimgyoyeon759@gmail.com)</p>

			<button type="button" on:click={() => showModal = false}>닫기</button>
		</div>
	</div>
{/if}
