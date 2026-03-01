# 다국어 알레르기 성분 탐지 시스템

식품 라벨을 촬영하면 텍스트를 추출하고 번역한 뒤,  
알레르기 성분을 자동으로 탐지하는 AI 기반 웹 서비스입니다.

외국인과 한국인 모두가 언어 장벽 없이  
식품 성분을 안전하게 확인할 수 있도록 설계했습니다.

> OCR → 번역 → DB 매칭 → AI 응답

## 프로젝트 배경

해외 식품을 구매할 때, 외국어로 표기된 성분표 때문에 
알레르기 보유자가 위험 성분을 직접 확인하기 어렵다는 문제를 발견했습니다.

또한 외국인 사용자가 한국 식품의 성분을 이해하는 데에도 
언어 장벽이 존재합니다.

이를 해결하기 위해,

1. 식품 라벨을 촬영
2. OCR로 텍스트를 추출
3. 번역을 수행
4. 알레르기 성분을 자동 탐지

다국어 기반 알레르기 감지 시스템을 구현했습니다.

---

#  주요 기능

## 1. OCR 기반 알레르기 감지

- 사용자가 업로드한 이미지에서 텍스트 추출
- 추출된 성분 목록에서 알레르기 성분 탐지
- `/ocr/` 엔드포인트에서 이미지 처리 수행
- `OCRService.detect_allergies()` 로직 기반 분석

### 처리 흐름
이미지 업로드 → 텍스트 추출 → 성분 파싱 → 알레르기 매칭 → 결과 반환

---

## 2. OpenAI 기반 챗봇

- 사용자의 텍스트 입력 처리
- OpenAI API를 활용한 자연어 응답 생성

### 처리 흐름
사용자 입력 → OpenAI API 호출 → 응답 가공 → 클라이언트 반환

---

## 3. 인증 / 회원관리

- 로그인 / 회원가입
- 비밀번호 재설정
- bcrypt 기반 비밀번호 암호화

---

## 4. 프론트엔드-백엔드 분리 구조

- Frontend: SvelteKit (SPA)
- Backend: FastAPI (REST API)
- CORS 설정을 통한 포트 분리 환경 구성

---

# 기술 스택

## Backend
- Python
- FastAPI

## Frontend
- SvelteKit
- TypeScript
- Prisma

## Database / ORM
- SQLAlchemy (Backend)
- Prisma Client (Frontend)

## External API
- OpenAI API (`OPENAI_API_KEY`)

---

# 환경 변수
```
OPENAI_API_KEY=your_key
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

# 로컬 실행 방법

## 1. Backend 실행 (예: 8000 포트)

```
bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

## 2. Frontend 실행

```
bash
npm install
npm run dev
```
