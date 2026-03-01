<script lang="ts">
	// 페이지가 처음 열릴 때 실행할 함수(onMount), 현재 경로를 가져오는 store(page)
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { user, getLoggedInUser, logout } from '$lib/auth';
	import Navbar from '$lib/components/Navbar.svelte';

	// 숨겨야 할 경로들 정의
	const hiddenRoutes = ['/login', '/register'];
	const hideNavbar = derived(page, $page => hiddenRoutes.includes($page.url.pathname));

	onMount(() => {
		getLoggedInUser(); // 로그인 상태 동기화
	});
</script>

<!-- 네비게이션은 특정 경로에서만 숨김 -->
{#if !$hideNavbar}
	<Navbar {user} {logout} />
{/if}

<!-- 본문 -->
<main>
	<slot />
</main>

<style>
	main {
		padding-top: 80px; /* 네비바 높이만큼 */
		box-sizing: border-box;
	}
</style>
