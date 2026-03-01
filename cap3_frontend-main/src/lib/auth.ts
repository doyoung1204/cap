// 이전 코드 (❌ 현재 사용하지 않음)
/*
export function getLoggedInUser() {
	// localStorage는 브라우저 탭을 닫아도 정보가 유지되므로 보안에 취약할 수 있음
	const user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
}

export function logout() {
	// localStorage에서 정보 제거 후 전체 새로고침 방식으로 이동
	localStorage.removeItem('user');
	window.location.href = '/login';
}
*/

//  변경 이유:
// 1. localStorage 대신 sessionStorage 사용 → 브라우저 탭 닫으면 자동 로그아웃 (보안 강화)
// 2. SvelteKit의 클라이언트 라우팅(goto) 활용 → 더 자연스럽고 빠른 페이지 전환
// 3. Svelte store(writable)를 통해 전역 로그인 상태 추적 가능

import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

//  현재 로그인 상태를 추적하는 Svelte store
export const user = writable<{ name: string; email: string } | null>(null);

/**
 *  현재 로그인된 사용자 정보를 반환합니다.
 * - 세션 스토리지(sessionStorage)에서 유저 정보를 가져옴
 * - SSR 환경에서는 null 반환
 * - 유효한 경우 user store에도 반영
 */
export function getLoggedInUser() {
	if (typeof window === 'undefined') return null; //  SSR 환경 보호

	try {
		const userData = sessionStorage.getItem('user'); //  세션 기반 사용자 정보 불러오기
		const parsed = userData ? JSON.parse(userData) : null;

		//  간단한 유효성 검사 후 반환
		if (parsed && typeof parsed.name === 'string' && typeof parsed.email === 'string') {
			user.set(parsed); // Svelte store에도 저장
			return parsed;
		}
	} catch (error) {
		console.error('유저 정보를 파싱하는 중 오류 발생:', error);
	}

	user.set(null); // 파싱 실패 시 초기화
	return null;
}

/**
 *  로그아웃 처리 함수
 * - sessionStorage에서 사용자 정보 제거
 * - user store 초기화
 * - 로그인 페이지로 라우팅
 */
export function logout() {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem('user'); // ✅ 로그아웃 시 세션 정보 제거
		user.set(null);                    // ✅ 상태 초기화
		goto('/login');                   // ✅ 클라이언트 라우팅으로 전환
	}
}
