# 리포트 메일

배포하지 않음. PR #14는 수정하지 않음. 기준은 라이브(PR #13) 파일.

기본값은 꺼짐. `REPORT_MAIL_ENABLED`가 `1`일 때만 메뉴, 발송, 스케줄이 동작한다.

메일은 표와 인라인 스타일이다. 로그인 없는 보기 페이지에서 브라우저 인쇄로 PDF를 저장한다. 주간 숫자는 기존 인사이트 스냅샷의 최근 7일과 그 전 7일이다. 구간이 비면 숫자를 만들지 않는다.

패치 SHA-256: `6bb39514563bb824a7703b4acd1d4d8c7c203943632c1c208bef87d500d5ed88`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `68087c611f887f1be134fea3d562a0c8d80c572b276317d33c50c625fa98e22f` | `53556243666aef8a63882ed3515d23b6bd0e341113a8e4acb056072939ce791d` |
| `public/app.js` | `af0e5224134378cd41fc31dc05ba9fa300568a3ed3796e18c3e5c098b56b6785` | `c4fde7005e7e2645a0833580ebaf83eca071759ee14d0d21efbd00aa10c99c57` |
| `public/styles.css` | `7e0970fa36adb110d6b2f64b0d205b1906e2fc988f20384aca328304e99b903a` | `1556cc8065bd21b0e633e12cffac1e3472e7cfdb693c98a0aef110484e5886d2` |
| `public/yt-report.js` | `6f36850a464958ccc2b55bfc5d6250e3865410a90ef572a7f159b452acf94cff` | 변경 없음 |
| `server.js` | `bfa9ff6d…` (이 작업 공간에는 라이브 파일 전체가 없음) | 패치 적용 후 `sha256sum server.js` |
| `lib/report-mail.js` | 없음 | `a7995fa4c59539a3bcaea1fcbd17c68926013a88a23be9d10c56eb970f064e55` |
| `test/report-mail.test.js` | 없음 | `d0c2954bd45e44685be85b9e14c9c7427f93c3750b78c41fa18c3a0556ce0c7f` |

적용: 앱 루트에서 `patch -p1 < report-mail/onepost-report-mail.patch`

테스트: `node --test test/report-mail.test.js` 5개 통과. 메일은 가짜 전송만 사용한다.
