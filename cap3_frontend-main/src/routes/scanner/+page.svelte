<script lang="ts">
	import character from '$lib/character.png';
	import userIcon from '$lib/user.png';
	import PrivacyFooter from '$lib/components/PrivacyFooter.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
 
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user, getLoggedInUser, logout } from '$lib/auth';
 
	let imageFile: File | null = null;
	let previewUrl: string | null = null;
 
	let messages: { role: 'user' | 'assistant'; text: string }[] = [
	   { role: 'assistant', text: '안녕하세요? 저는 가공식품 성분 분석 챗봇 엘리에요.' }
	];
	let userInput = '';
 
	onMount(() => {
	   const currentUser = getLoggedInUser();
	   if (!currentUser) goto('/login');
	});
 
	async function handleImageUpload(event: Event) {
	   const target = event.target as HTMLInputElement;
	   if (target.files && target.files.length > 0) {
		  imageFile = target.files[0];
		  previewUrl = URL.createObjectURL(imageFile);
 
		  messages = [...messages, { role: 'user', text: '📷 영양성분표 사진을 업로드했어요.' }];
		  await analyzeImage();
	   }
	}
 
	async function analyzeImage() {
	   if (!imageFile) return;
 
	   const formData = new FormData();
	   formData.append("file", imageFile);
 
	   try {
		  console.log("🚀 FastAPI OCR 요청 시작...");
		  const res = await fetch('/scanner', {
			 method: 'POST',
			 body: formData
		  });

		  if (!res.ok) {
            throw new Error("🚨 FastAPI OCR 요청 실패");
        }

        const data = await res.json();
        console.log("✅ FastAPI 응답:", data);

        // 🚀 FastAPI 응답에서 "warning" 메시지만 추출하여 표시
        const warningMessage = data.warning ? data.warning : "✅ 안전합니다!";  

        messages = [...messages, { role: 'assistant', text: warningMessage }];  
    	} catch (error) {
        console.error("🚨 OCR 요청 실패:", error);
        messages = [...messages, { role: 'assistant', text: "🚨 오류 발생! 다시 시도해 주세요." }];
    	}

	// 	  const data = await res.json();
	// 	  console.log("✅ FastAPI 응답:", data);
 
	// 	  const warningMessage = data.warning ?? "✅ 안전합니다!";
	// 	  messages = [...messages, { role: 'assistant', text: warningMessage }];
	//    } catch (error) {
	// 	  console.error("🚨 OCR 요청 실패:", error);
	// 	  messages = [...messages, { role: 'assistant', text: '🚨 오류 발생! 다시 시도해 주세요.' }];
	//    }
	}
 
	async function sendMessage() {
	   if (!userInput.trim()) return;
 
	   messages = [...messages, { role: 'user', text: userInput }];
 
	   const res = await fetch('/api/chat', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ message: userInput })
	   });
	   const data = await res.json();
	   const reply = data.result?.choices?.[0]?.message?.content || 'AI 응답을 불러오지 못했습니다.';
 
	   messages = [...messages, { role: 'assistant', text: reply }];
	   userInput = '';
	}
 </script>
 
 <Navbar {user} {logout} />
 
 <div class="container">
	<div class="chat-container">
	   {#if $user}
		  <h2 style="text-align:center; margin-bottom: 2rem;">{$user.name}님, 반갑습니다!</h2>
	   {/if}
 
	   <!-- 메시지 리스트 -->
	   {#each messages as msg}
		  <div class="message {msg.role}">
			 <img src={msg.role === 'user' ? userIcon : character} alt={msg.role} class="avatar" />
			 <div class="bubble {msg.role}">{msg.text}</div>
		  </div>
	   {/each}
 
	   <!-- 입력창 -->
	   <div class="input-area">
		  <input type="file" accept="image/*" on:change={handleImageUpload} />
		  <textarea rows="2" bind:value={userInput} placeholder="엘리에게 질문을 입력하세요..."></textarea>
		  <button on:click={sendMessage}>전송</button>
	   </div>
	</div>
 </div>
 
 <PrivacyFooter />
 
 <style>
	:global(body) { margin: 0; }
 
	.container {
	   min-height: 100vh;
	   padding: 7rem 2rem 6rem;
	   background: #ffffff;
	   font-family: 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
	   box-sizing: border-box;
	}
 
	.chat-container {
	   max-width: 900px;
	   margin: 0 auto;
	   background: #f9fef7;
	   border-radius: 1rem;
	   padding: 2rem;
	   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	}
 
	.message {
	   display: flex;
	   gap: 1rem;
	   margin-bottom: 1.5rem;
	}
	.message.user {
	   flex-direction: row-reverse;
	   text-align: right;
	}
	.message.assistant {
	   flex-direction: row;
	   text-align: left;
	}
 
	.avatar {
	   width: 48px;
	   height: 48px;
	   border-radius: 50%;
	}
 
	.bubble {
	   max-width: 70%;
	   padding: 1rem;
	   border-radius: 1rem;
	   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	   white-space: pre-wrap;
	   word-break: break-word;
	}
	.bubble.user { background: #e0f7fa; }
	.bubble.assistant { background: #dcedc8; }
 
	.input-area {
	   display: flex;
	   gap: 1rem;
	   margin-top: 2rem;
	   flex-wrap: wrap;
	   align-items: center;
	}
	input[type="file"], textarea {
	   flex: 1 1 auto;
	   padding: 0.8rem;
	   border-radius: 1rem;
	   border: none;
	   background-color: #f0fbe0;
	   font-family: inherit;
	   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}
	textarea {
	   width: 100%;
	   resize: none;
	}
	button {
	   background-color: #2e7d32;
	   color: white;
	   padding: 0.7rem 1.5rem;
	   border: none;
	   border-radius: 1.5rem;
	   font-weight: bold;
	   cursor: pointer;
	}
 </style> 
