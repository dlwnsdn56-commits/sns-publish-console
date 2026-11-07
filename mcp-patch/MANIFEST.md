# MCP 패치 매니페스트

배포하지 않음. 머지하지 않음. 주간 리포트와 홈 패치를 섞지 않음.

패치 SHA-256: `4b38f145c4cfc1714fc7c88753b3750971674216d45027ee596e7c319402fcd1`

기준 트리는 2026-11-06 내보내기 + 배포된 채널 분석 패치이다. 원시 내보내기나 주간 리포트 트리에 그대로 적용하지 않는다.

## 파일 해시

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `f40c75bdd1927431a8c893731b0250377606d970e438003923e8972cc7bcb81b` | `1a925ff60938f350ea7757a070eb197ce4674e1c61c600fe9d26e4ad62c21db6` |
| `public/index.html` | `7c41f4f3708274e4fd425a99b75bc28597f107f8c3fb77e4e13f2fc1df805a17` | `612c332cda971de2be4b07b7f87084fec749df82d8e8b09d60da85a461faa9ae` |
| `lib/publish-job.js` | 없음 | `f7284fe39e5eda6e69c757b37aa3635670e5ec52120856b34fe01076a3b2af9d` |
| `lib/mcp.js` | 없음 | `2eb1168854fbe077dbc84d4a54a8492c459a715dabdfed2012029c8f2fe0aee0` |
| `lib/mcp-store.js` | 없음 | `f854f60fe2b4345665ed4342e45eeb350b79620a2d1bf19cacbf301456b16fff` |
| `lib/mcp-channels.js` | 없음 | `873eee6f6ee9e9455be7c9047463fcd028797403db55f82a7bcb13317dbc09f3` |
| `public/mcp-keys.html` | 없음 | `6f37f91a07e6b6e4e38aa44293e86f8ca5ab282fac83a1c8d69423aa6a777a9d` |
| `test/mcp.test.js` | 없음 | `088f84361692002c37571e57dbf3174019b65f899cd5d687cd0b2b6decf20fef` |

바꾸지 않음:

- `public/ether.html` 운영 값 `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`
- `package.json` `f422c3126b178ebaab71c690ef9eff33e815edd6e39463e3704b4e4a32daa872`
- `package-lock.json` `1515c63f95b39df55f66bd17a9ce063db733e0ffef0429a1b112dd444f2a519a`
- `lib/insights.js` `bda335c4b5499012f7174e342fe456e74e6fd21d7947503343556e953eccec1f`

의존성 추가 없음. 마이그레이션 없음. 런타임 파일은 `data/mcp.json`, `data/mcp-audit.jsonl`. 선택 환경 변수는 `ONEPOST_PUBLIC_BASE` 하나.

테스트: `node --test test/mcp.test.js test/channel-analysis.test.js` 10개 통과. 외부 발행 호출 없음. 공급자는 목이다.
