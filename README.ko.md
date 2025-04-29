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
export VRCHAT_AUTH_TOKEN=your_auth_token
```

> [!NOTE]
> #### AUTH TOKEN 얻는 방법
>
> 다음 명령으로 로그인하고 auth 토큰을 얻을 수 있습니다:
> ```
> $ npx vrchat-auth-token-checker
>
> VRChat Username: your-username
> Password: ********
>
> # If 2FA is enabled
> 2FA Code: 123456
>
> # Success output
> Auth Token: authcookie-xxxxx
> ```
> [명령어 소스 코드](https://github.com/sawa-zen/vrchat-auth-token-checker)
>
> **얻은 토큰은 수명이 매우 길기 때문에 신중하게 다루세요**

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
        "VRCHAT_AUTH_TOKEN": "your-auth-token"
      }
    }
  }
}
```

그런 다음 평소처럼 Claude Desktop을 시작하세요. nodenv나 nvm을 사용하는 경우 `npx` 명령의 전체 경로를 지정해야 할 수 있습니다.

## 사용 가능한 도구

이 Model Context Protocol 서버는 다음과 같은 VRChat 관련 도구를 제공합니다:

### 사용자 관련
- vrchat_get_friends_list: 친구 목록 가져오기
- vrchat_send_friend_request: 친구 요청 보내기

### 아바타 관련
- vrchat_search_avatars: 아바타 검색
- vrchat_select_avatar: 아바타 선택 및 변경

### 월드 관련
- vrchat_search_worlds: 월드 검색
- vrchat_list_favorited_worlds: 즐겨찾기 월드 목록 가져오기

### 인스턴스 관련
- vrchat_create_instance: 새 인스턴스 생성
- vrchat_get_instance: 특정 인스턴스 정보 가져오기

### 그룹 관련
- vrchat_search_groups: 그룹 검색
- vrchat_join_group: 그룹 참가

### 즐겨찾기 관련
- vrchat_list_favorites: 즐겨찾기 목록 가져오기
- vrchat_add_favorite: 새 즐겨찾기 추가
- vrchat_list_favorite_groups: 즐겨찾기 그룹 목록 가져오기

### 초대 관련
- vrchat_list_invite_messages: 초대 메시지 목록 가져오기
- vrchat_request_invite: 초대 요청 보내기
- vrchat_get_invite_message: 특정 초대 메시지 가져오기

### 알림 관련
- vrchat_get_notifications: 알림 목록 가져오기

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

2. 빌드 실행
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
