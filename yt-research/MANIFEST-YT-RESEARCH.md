# 유튜브 리서치와 한 장 보고서

배포하지 않음. 병합하지 않음. `YT_RESEARCH_ENABLED` 기본값은 꺼짐. 메뉴는 모든 로그인 사용자에게 보입니다.

패치 SHA-256: `02048e7034c162d12435f399982654b31fc34c957082d13691f269ada0068694`

이전 패치 `d0067ec1365c99c0a7ddd5b3964695aae41a787acb2c48866e6e5873123bdf55` 를 대체한다. 라이브 콘솔에 직접 적용한다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 라이브 원본에 적용한 뒤 계산 |
| `public/index.html` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` | `d3b5bb9d4d948914da878074018ab78f0974e303988c229f40a773e874d31ef8` |
| `public/app.js` | `1343a93e0a8d1571174bd7afefcd0c757de621eb14fe96c1f5fe28f9571bb8c6` | `c4984b150661126307b6040631dcd9126a6c05dd906a36958dc88ad623f184d1` |
| `public/styles.css` | `0386dd68b43174faaceae5012069d32ac03e8641d3482cbfae9cd06d2f798fbe` | `d7bb4533a29dd189b5e900f0968a6bcca207370b66ed2d95ecb00076aee5091e` |
| `public/yt-report.js` | 없음 | `e18e690bc8453e996e4abdd31d40b7c91137df94fa4d61c111f82e552adee72c` |
| `lib/yt-research.js` | 없음 | `3079984f60ba6561f2ab95d488465e704f0cb98245c79ac79ecbc839e7319b66` |
| `test/yt-research.test.js` | 없음 | `a21a752489ec2df78c54f825d09b38216c18a353d8e55ce58b4b23f7e3e140d1` |
| `test/yt-report.test.js` | 없음 | `62104b1d5819fcbc1456e97b6e670225acd185cc833354a6ddef2ae8f186e80b` |

한 장 보고서의 유튜브 숫자는 공식 API 캐시 결과만 쓰고, 인스타그램은 입력값이나 연결된 값이 있을 때만 채운다. AI 문장 생성은 넣지 않았다.

테스트: `node --test test/yt-research.test.js test/yt-report.test.js` 8개 통과.
