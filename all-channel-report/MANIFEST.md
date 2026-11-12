# 7개 채널 한 장 보고서

배포하지 않음. 새 기능 플래그는 없다. 없는 숫자는 비워 둔다.

패치 SHA-256: `f036e6c16a1f11dea10beb12631b874c24301dd98010c9b1b261a792f9b71993`

기준은 2026-11-12 16:52에 배포된 라이브 콘솔이다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `c71a2d48143c14275b0797078b3e978103f4e55754d50e9f1282fa7ef2010806` | `94b35507298fcc303e0581c4c8ed2a795160e2d8086bfd333f24e3162aa183e1` |
| `public/app.js` | `5437c877d91b40ccbdd68655dfeabca442d79f86669d45d6b39b5c74c6c3e507` | `9a7e4bb28ac181bb0394b867adddede35746afc5eeeffd733919f71cafa7aa26` |
| `public/styles.css` | `2d9944d22d0d3d8e82402cc512f75da49c6d6c77a49eb27be7283b5b8a32984c` | `325ee13ac8ea13fe8deb5441875aeb7b6ac585e937144d3ef783ca03ba2ce257` |
| `public/yt-report.js` | `e18e690bc8453e996e4abdd31d40b7c91137df94fa4d61c111f82e552adee72c` | `a8d8c96f07d5c653943422a1c3620fcffa333667f159cb6682a7f2e05f07c5e6` |
| `test/all-channel-report.test.js` | 없음 | `e75d07881dea98bbe3c35971fb4f908b0557a829c56ad92c0b02d7315d9cf03c` |

`lib/yt-research.js` `3079984f60ba6561f2ab95d488465e704f0cb98245c79ac79ecbc839e7319b66` 와 `server.js` `bfa9ff6d` 대는 바꾸지 않는다.

테스트: `node --test test/all-channel-report.test.js` 3개 통과.
