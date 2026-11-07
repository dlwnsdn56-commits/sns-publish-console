# MCP 패치 매니페스트

배포하지 않음. 머지하지 않음. 주간 리포트와 홈 패치를 섞지 않음.

패치 SHA-256: `5d442ef85a9c8f1fbc5e5db4b79238941d15dc64f13bb659a6b36fe4b251402a`

기준 트리는 2026-11-06 내보내기 + 배포된 채널 분석 패치이다. 원시 내보내기나 주간 리포트 트리에 그대로 적용하지 않는다.

## 파일 해시

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `f40c75bdd1927431a8c893731b0250377606d970e438003923e8972cc7bcb81b` | `1a925ff60938f350ea7757a070eb197ce4674e1c61c600fe9d26e4ad62c21db6` |
| `public/index.html` | `7c41f4f3708274e4fd425a99b75bc28597f107f8c3fb77e4e13f2fc1df805a17` | `612c332cda971de2be4b07b7f87084fec749df82d8e8b09d60da85a461faa9ae` |
| `lib/publish-job.js` | 없음 | `f7284fe39e5eda6e69c757b37aa3635670e5ec52120856b34fe01076a3b2af9d` |
| `lib/mcp.js` | 없음 | `ae00a90cccb8692ecbb3e20e015cf290364dfd61fef9b06301088d0e9775aa5d` |
| `lib/mcp-store.js` | 없음 | `98aad03ed2f6485e79e0066e323a6bbd354729ec911117b0a5a25e1868ac784e` |
| `lib/mcp-channels.js` | 없음 | `c4fd3773ef512e3601577bb2a6dee9c8da79e43464df9a1bbfee01d5284f4832` |
| `public/mcp-keys.html` | 없음 | `dd833f5f3212feda9415ef3adf9ecf284ca7d17e6d7f44a2425691b44dcf5c92` |
| `test/mcp.test.js` | 없음 | `0c827405ee74d76662007074cab7b750c68b8f70a8d324c3c4458349f60cd628` |
| `test/mcp-security.test.js` | 없음 | `cd3a3bae6469610e52d94f13005fcf8b4f1aa9d9df80eac123a55f563eb095d4` |

바꾸지 않음:

- `public/ether.html` 운영 값 `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`
- `package.json` `f422c3126b178ebaab71c690ef9eff33e815edd6e39463e3704b4e4a32daa872`
- `package-lock.json` `1515c63f95b39df55f66bd17a9ce063db733e0ffef0429a1b112dd444f2a519a`
- `lib/insights.js` `bda335c4b5499012f7174e342fe456e74e6fd21d7947503343556e953eccec1f`

의존성 추가 없음. 공식 MCP SDK는 로컬 호환 확인에만 썼고 앱 패키지에 넣지 않았다. 마이그레이션 없음. 런타임 파일은 `data/mcp.json`, `data/mcp-audit.jsonl`. 선택 환경 변수는 `ONEPOST_PUBLIC_BASE` 하나.

## 전송

구현된 것은 상태 없는 Streamable HTTP의 JSON 응답이다. `POST /mcp`는 `Content-Type: application/json`이고, `Accept`에 `application/json` 또는 `*/*`가 있어야 한다. 응답은 `application/json`이다. `GET /mcp`는 SSE를 열지 않고 405를 준다. 세션 ID는 발급하지 않는다. 구현 프로토콜은 `2025-03-26`과 `2024-11-05`이다. 더 새 버전을 요청하면 `2025-03-26`으로 낮춰 답한다. `2025-11-25`의 task 기능은 없다.

인증은 `Authorization: Bearer opm_...`뿐이다. OAuth 동적 등록은 없다.

테스트: `node --test test/mcp.test.js test/mcp-security.test.js test/channel-analysis.test.js` 16개 통과. 외부 발행 없음.
