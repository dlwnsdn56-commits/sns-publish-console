# AI 연결 안내 패치 매니페스트

배포하지 않음. 머지하지 않음. 주간 리포트와 섞지 않음. `server.js`를 바꾸지 않음.

패치 SHA-256: `dec7a32e00df88fc8872b3929ee7bce6b7a9054d4f3f92f57138d3e38dc88d18`

기준은 2026-11-07 19:36 KST에 반영된 MCP 운영 파일이다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `612c332cda971de2be4b07b7f87084fec749df82d8e8b09d60da85a461faa9ae` | `bdebb2fc14d4b885273b933211e5a73620e2f7e65cc1d6e8841d8c558747f763` |
| `lib/mcp.js` | `ae00a90cccb8692ecbb3e20e015cf290364dfd61fef9b06301088d0e9775aa5d` | `493a68808a95c16e7229518de2be3e56a1ef867446ee8212d2eef0afb3eb6acc` |
| `public/mcp-keys.html` | `dd833f5f3212feda9415ef3adf9ecf284ca7d17e6d7f44a2425691b44dcf5c92` | `2984317b2f6783caf1105a831937595a219acf130a7abb676f6f0d55426418e6` |
| `public/mcp-guide.html` | 없음 | `3c421cbbab2e0e024063abc00a1ef669ce5912846b457fce5b55d4485cba7ff5` |
| `test/mcp-guide.test.js` | 없음 | `d0e90aa518df316b73faacd6fb3ae8a53c265217a17f8441344e6763aff603f7` |

바꾸지 않음:

- `server.js` `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753`
- `public/ether.html` `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`
- `public/ether-sua.html` `58381e71bf91ad7dfaf3a9eb6a216271a1cc005d5e912e079d34d8c12dd7219c`

계정 리터럴이 있는 `server.js` 줄은 이 패치에 없다. 의존성, 환경 변수, 마이그레이션 변경 없음.

테스트: `node --test test/mcp-guide.test.js` 2개 통과. 390px에서 가로 스크롤 없음. 외부 발행과 키 발급 없음.
