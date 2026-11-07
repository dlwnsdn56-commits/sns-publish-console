# 원포스트 MCP 미리보기 패치

배포하지 않는다. 머지하지 않는다. 이 문서는 적용 절차만 적는다.

기준은 2026-11-06 내보내기에 **이미 배포된 채널 분석 패치**를 적용한 트리이다. 주간 리포트 패치는 포함하지 않는다. `public/ether.html`은 포함하지 않는다. 운영 중인 달고맵고 홈(`2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`)을 되돌리지 않는다.

## 적용 전 확인

운영 트리에서 아래 해시가 같을 때만 `patch --dry-run -p1`를 한다. 하나라도 다르면 멈추고 현재 파일을 다시 받는다.

- `server.js` `f40c75bdd1927431a8c893731b0250377606d970e438003923e8972cc7bcb81b`
- `public/index.html` `7c41f4f3708274e4fd425a99b75bc28597f107f8c3fb77e4e13f2fc1df805a17`
- `public/ether.html`은 패치 대상이 아니다. 배포된 값 `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`가 유지되어야 한다.

```
cd /opt/onepost/sns-publish-console
sha256sum server.js public/index.html public/ether.html
patch --dry-run -p1 < onepost-mcp-final.patch
```

새 npm 패키지는 없다. `package.json`과 `package-lock.json`은 바꾸지 않는다. 데이터베이스 마이그레이션은 없다. 첫 사용 때 `data/mcp.json`과 `data/mcp-audit.jsonl`이 생긴다. 공식 MCP SDK는 서버 의존성이 아니다.

선택 환경 변수 `ONEPOST_PUBLIC_BASE`만 승인 링크의 공개 주소를 덮어쓴다. 비우면 로컬 호스트는 요청 호스트, 그 외에는 `https://1post.kr`을 쓴다.

## 롤백

같은 디렉터리에서 `patch -R -p1 < onepost-mcp-final.patch`. 이미 승인되어 만들어진 작업은 기존 작업으로 남는다. 남은 `data/mcp.json`은 코드가 없으면 쓰이지 않는다. 홈 파일은 롤백 대상이 아니다.
