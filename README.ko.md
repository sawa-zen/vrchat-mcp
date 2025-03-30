![VRChat MCP](./eyecatch.jpg)

[![npm version](https://badge.fury.io/js/vrchat-mcp.svg)](https://badge.fury.io/js/vrchat-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

이 프로젝트는 VRChat API와 상호 작용하기 위한 Model Context Protocol (MCP) 서버입니다. 표준화된 프로토콜을 사용하여 VRChat에서 다양한 정보를 검색할 수 있습니다.

<a href="https://youtu.be/0MRxhzlFCkw">
  <img width="300" src="https://github.com/user-attachments/assets/85c00cc4-46b3-4f66-ab36-bf2891fdb283" alt="YouTube" />
</a>

<a href="https://glama.ai/mcp/servers/u763zoyi5a">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/u763zoyi5a/badge" />
</a>

## 개요

VRChat MCP 서버는 VRChat의 API 엔드포인트에 구조화된 방식으로 접근할 수 있는 방법을 제공합니다. 사용자 인증, 사용자 및 친구 정보 검색, 아바타 및 월드 데이터 접근 등 다양한 기능을 지원합니다.

## 사용 방법

서버를 시작하려면 필요한 환경 변수를 설정하세요:

```bash
export VRCHAT_USERNAME=your_username
export VRCHAT_PASSWORD=your_password
export VRCHAT_TOTP_SECRET=your_totp_secret
export VRCHAT_EMAIL=your_email@example.com
```

> [!NOTE]
> #### TOTP 시크릿 얻기
> 1. [VRChat 프로필](https://vrchat.com/home/profile)에 접속하여 2단계 인증을 활성화합니다.
> 2. 표시된 QR 코드를 디코딩하여 `otpauth://totp/VRChat:your@email.com?secret=XXXXXXXXXXXXXXXXXXX&issuer=VRChat`와 같은 문자열을 얻습니다.
> 3. `XXXXXXXXXXXXXXXXXXX` 부분을 TOTP 시크릿으로 사용합니다.
>
> **이 방법은 보안상의 우려가 있을 수 있으므로 신중하게 진행하세요.**

그런 다음 다음 명령을 실행합니다:

```bash
npx vrchat-mcp
```

이렇게 하면 MCP 서버가 시작되어 정의된 도구를 통해 VRChat API와 상호 작용할 수 있습니다.

## Claude Desktop에서 사용하기

이 MCP 서버를 Claude Desktop에서 사용할 때는 `npx vrchat-mcp`를 수동으로 실행할 필요가 없습니다. 대신 Claude Desktop 설정 파일에 다음 구성을 추가하세요:

- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vrchat-mcp": {
      "command": "npx",
      "args": ["vrchat-mcp"],
      "env": {
        "VRCHAT_USERNAME": "your-username",
        "VRCHAT_PASSWORD": "your-password",
        "VRCHAT_TOTP_SECRET": "your-totp-secret",
        "VRCHAT_EMAIL": "your-email@example.com"
      }
    }
  }
}
```

그런 다음 평소처럼 Claude Desktop을 시작하세요. nodenv나 nvm을 사용하는 경우 `npx` 명령의 전체 경로를 지정해야 할 수 있습니다.

## VRChat API 엔드포인트

다음은 우리의 Model Context Protocol 서버가 지원하거나 지원 예정인 VRChat API 엔드포인트 목록입니다. GET 및 POST 메서드를 모두 포함하여 포괄적인 기능을 제공합니다. 체크박스는 각 엔드포인트의 구현 상태를 나타냅니다.

### 인증 및 사용자 정보
- [x] 현재 사용자 정보 가져오기
- [ ] 사용자 검색
- [ ] 특정 사용자 프로필 가져오기
- [ ] 사용자 그룹 가져오기
- [ ] 플레이어 중재 가져오기
- [ ] 사용자 상태 가져오기
- [ ] 사용자 정보 업데이트
- [ ] 사용자 상태 업데이트
- [ ] 사용자 차단
- [ ] 사용자 차단 해제

### 친구 관련
- [x] 친구 목록 가져오기
- [ ] 온라인 친구 가져오기
- [x] 친구 요청 보내기
- [ ] 친구 요청 수락/거절
- [ ] 친구 삭제

### 아바타 관련
- [ ] 자신의 아바타 가져오기
- [ ] 즐겨찾기 아바타 가져오기
- [x] 아바타 검색
- [ ] 특정 아바타 상세 정보 가져오기
- [ ] 공개 아바타 가져오기
- [ ] 아바타 생성
- [ ] 아바타 업데이트
- [ ] 아바타 삭제
- [x] 아바타 선택
- [ ] 아바타 즐겨찾기/즐겨찾기 해제

### 월드 관련
- [ ] 월드 목록 가져오기
- [ ] 활성 월드 가져오기
- [ ] 최근 방문한 월드 가져오기
- [ ] 즐겨찾기 월드 가져오기
- [x] 월드 검색
- [ ] 특정 월드 상세 정보 가져오기
- [ ] 월드 인스턴스 가져오기
- [ ] 공개 월드 가져오기
- [ ] 월드 생성
- [ ] 월드 업데이트
- [ ] 월드 삭제
- [ ] 월드 즐겨찾기/즐겨찾기 해제

### 인스턴스 관련
- [x] 인스턴스 생성
- [x] 인스턴스 정보 가져오기
- [ ] 인스턴스 참가자 가져오기
- [ ] 인스턴스 짧은 이름 가져오기
- [ ] 인스턴스 참가
- [ ] 인스턴스 나가기
- [ ] 사용자를 인스턴스에 초대

### 파일 관련
- [ ] 파일 정보 가져오기
- [ ] 파일 다운로드 정보 가져오기
- [ ] 파일 상태 가져오기

### 그룹 관련
- [x] 그룹 검색
- [ ] 특정 그룹 정보 가져오기
- [ ] 그룹 멤버 가져오기
- [ ] 그룹 권한 가져오기
- [ ] 그룹 요청 가져오기
- [ ] 그룹 초대 가져오기
- [ ] 그룹 차단 가져오기
- [ ] 그룹 갤러리 가져오기
- [ ] 그룹 소유 월드 가져오기
- [ ] 그룹 생성
- [ ] 그룹 업데이트
- [ ] 그룹 삭제
- [x] 그룹 참가
- [ ] 그룹 나가기
- [ ] 사용자를 그룹에 초대
- [ ] 그룹 초대 수락/거절
- [ ] 사용자를 그룹에서 차단
- [ ] 사용자의 그룹 차단 해제

### 알림 관련
- [ ] 알림 목록 가져오기
- [ ] 친구 요청 가져오기
- [ ] 읽지 않은 알림 수 가져오기
- [ ] 알림을 읽음으로 표시
- [ ] 알림 삭제
- [ ] 모든 알림 지우기

### 인벤토리 관련
- [ ] 라이선스 유형 가져오기
- [ ] 보유 라이선스 가져오기
- [ ] 스토어 목록 가져오기

### 시스템 관련
- [ ] API 설정 가져오기
- [ ] API 제한 가져오기
- [ ] 시스템 상태 확인
- [ ] 온라인 사용자 수 가져오기
- [ ] 서버 공지 가져오기

### 즐겨찾기 관련
- [x] 즐겨찾기 목록 가져오기
- [ ] 즐겨찾기 추가
- [ ] 즐겨찾기 삭제
- [x] 즐겨찾기 그룹 목록 가져오기
- [ ] 즐겨찾기 그룹 표시
- [ ] 즐겨찾기 그룹 업데이트
- [ ] 즐겨찾기 그룹 지우기
- [ ] 즐겨찾기 제한 가져오기

### 기타
- [ ] 태그 목록 가져오기
- [ ] 숨김 목록 가져오기
- [ ] 중재 가져오기
- [ ] 즐겨찾기 그룹 유형 가져오기
- [ ] 중재 생성
- [ ] 중재 삭제

## 디버깅

먼저 프로젝트를 빌드하세요:

```bash
npm install
npm run build
```

MCP 서버는 stdio를 통해 실행되므로 디버깅이 어려울 수 있습니다. 최상의 디버깅 경험을 위해 MCP Inspector 사용을 강력히 권장합니다.

다음 명령으로 npm을 통해 MCP Inspector를 실행할 수 있습니다:

```bash
npx @modelcontextprotocol/inspector "./dist/main.js"
```

환경 변수가 올바르게 구성되어 있는지 확인하세요.

실행하면 Inspector는 브라우저에서 접근할 수 있는 URL을 표시합니다. 이 URL에 접속하여 디버깅을 시작할 수 있습니다.

## 패키지 배포

패키지를 배포하려면 다음 단계를 따르세요:

1. main 브랜치의 최신 코드를 로컬로 가져오기
   ```bash
   git checkout main
   git pull origin main
   ```

2. 필요에 따라 버전 업데이트
   ```bash
   # 패치 버전 업데이트 (예: 0.1.2 → 0.1.3)
   npm version patch

   # 마이너 버전 업데이트 (예: 0.1.2 → 0.2.0)
   npm version minor

   # 메이저 버전 업데이트 (예: 0.1.2 → 1.0.0)
   npm version major
   ```

3. 빌드 실행
   ```bash
   npm run build
   ```

4. npm에 패키지 배포
   ```bash
   npm publish
   ```

5. 변경사항을 원격 저장소에 푸시
   ```bash
   git push origin main --tags
   ```

## 기여하기

기여를 환영합니다! 개선이나 버그 수정을 위한 풀 리퀘스트를 제출하려면 저장소를 포크하세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 제공됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.
