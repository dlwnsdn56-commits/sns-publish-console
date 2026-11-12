# 7개 채널 한 장 보고서

배포하지 않음. 새 기능 플래그는 없다. 없는 숫자는 비워 둔다.

패치 SHA-256: `f9561eab9dc0d650d0e071c2f4a308695016dd2bd3af7ea630fba58f03299b0c`

기준은 2026-11-12 16:52에 배포된 라이브 콘솔이다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `c71a2d48143c14275b0797078b3e978103f4e55754d50e9f1282fa7ef2010806` | `68087c611f887f1be134fea3d562a0c8d80c572b276317d33c50c625fa98e22f` |
| `public/app.js` | `5437c877d91b40ccbdd68655dfeabca442d79f86669d45d6b39b5c74c6c3e507` | `af0e5224134378cd41fc31dc05ba9fa300568a3ed3796e18c3e5c098b56b6785` |
| `public/styles.css` | `2d9944d22d0d3d8e82402cc512f75da49c6d6c77a49eb27be7283b5b8a32984c` | `7e0970fa36adb110d6b2f64b0d205b1906e2fc988f20384aca328304e99b903a` |
| `public/yt-report.js` | `e18e690bc8453e996e4abdd31d40b7c91137df94fa4d61c111f82e552adee72c` | `6f36850a464958ccc2b55bfc5d6250e3865410a90ef572a7f159b452acf94cff` |
| `test/all-channel-report.test.js` | 없음 | `28fdb5cc902083676f47bca3fbbc2112b193d367c1186e315d6ceb7e5b025c40` |

`lib/yt-research.js` `3079984f60ba6561f2ab95d488465e704f0cb98245c79ac79ecbc839e7319b66` 와 `server.js` `bfa9ff6d` 대는 바꾸지 않는다.

조회수 탭도 같은 한 장 스타일이다. 기간 버튼과 새로고침은 그대로다.

테스트: `node --test test/all-channel-report.test.js` 4개 통과.
