# AI 연결 안내 페이지

배포하지 않는다. 머지하지 않는다. 키를 만들거나 SNS에 발행하지 않는다.

이 패치는 2026-11-07에 운영 반영된 MCP 패치 위의 증분이다. 주간 리포트는 포함하지 않는다. `server.js`, `public/ether.html`, `public/ether-sua.html`은 포함하지 않는다.

## 적용 전 확인

아래 해시가 같을 때만 `patch --dry-run -p1`를 한다.

- `public/index.html` `612c332cda971de2be4b07b7f87084fec749df82d8e8b09d60da85a461faa9ae`
- `lib/mcp.js` `ae00a90cccb8692ecbb3e20e015cf290364dfd61fef9b06301088d0e9775aa5d`
- `public/mcp-keys.html` `dd833f5f3212feda9415ef3adf9ecf284ca7d17e6d7f44a2425691b44dcf5c92`
- `server.js`는 바꾸지 않는다. 운영 값 `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753`이 유지되어야 한다.
- `public/ether.html` `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`
- `public/ether-sua.html` `58381e71bf91ad7dfaf3a9eb6a216271a1cc005d5e912e079d34d8c12dd7219c`

```
cd /opt/onepost/sns-publish-console
sha256sum public/index.html lib/mcp.js public/mcp-keys.html server.js public/ether.html
patch --dry-run -p1 < onepost-mcp-guide.patch
```

새 npm 패키지와 환경 변수, 데이터베이스 변경은 없다.

## 롤백

`patch -R -p1 < onepost-mcp-guide.patch` 후 생긴 `public/mcp-guide.html`과 `test/mcp-guide.test.js`가 남아 있으면 지운다. 홈 파일과 `server.js`는 이 패치의 롤백 대상이 아니다.
