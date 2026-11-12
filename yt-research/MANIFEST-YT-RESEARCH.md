# 유튜브 리서치와 한 장 보고서

배포하지 않음. 병합하지 않음. `YT_RESEARCH_ENABLED` 기본값은 꺼짐. 메뉴는 모든 로그인 사용자에게 보입니다.

패치 SHA-256: `934f2e1b3f9c0e0b25cb241b0a5791569ff1f88ae140d2ac6ec9deeacf7ccc6e`

이전 패치 `d0067ec1365c99c0a7ddd5b3964695aae41a787acb2c48866e6e5873123bdf55` 를 대체한다. 라이브 콘솔에 직접 적용한다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 라이브 원본에 적용한 뒤 계산 |
| `public/index.html` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` | `d3b5bb9d4d948914da878074018ab78f0974e303988c229f40a773e874d31ef8` |
| `public/app.js` | `1343a93e0a8d1571174bd7afefcd0c757de621eb14fe96c1f5fe28f9571bb8c6` | `9717c6a495a450ec622563885bcc81820b014a722f6e22698db1799e7632140b` |
| `public/styles.css` | `0386dd68b43174faaceae5012069d32ac03e8641d3482cbfae9cd06d2f798fbe` | `19d6474359466ab2571c2001ef34595c701ab411aa4a38672a9a831e3bc7e7a4` |
| `public/yt-report.js` | 없음 | `01a7ec24d63dfce49aea4bbd075d6fe21a2bf931c038fe69e32d81766e61e77a` |
| `lib/yt-research.js` | 없음 | `da61d2b280da210e02d3fafe46349cf9db710c8468eca9d93a18f26b5aaf7123` |
| `test/yt-research.test.js` | 없음 | `1e9deb04fe13df243dcf5ca05205cc707abdc235ae31e515ec25f529741b93fe` |
| `test/yt-report.test.js` | 없음 | `a042468ebf4c40a9b4b855d4ee7ccc4debfee1718851c25aa6edf9f8d272c7d6` |

한 장 보고서의 유튜브 숫자는 공식 API 캐시 결과만 쓰고, 인스타그램은 입력값이나 연결된 값이 있을 때만 채운다. AI 문장 생성은 넣지 않았다.

테스트: `node --test test/yt-research.test.js test/yt-report.test.js` 8개 통과.
