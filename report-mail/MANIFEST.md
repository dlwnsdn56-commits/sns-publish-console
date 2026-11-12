# 리포트 메일

배포하지 않음. PR #14는 수정하지 않음. 기준은 라이브(PR #13) 파일.

기본값은 꺼짐. `REPORT_MAIL_ENABLED`가 `1`일 때만 메뉴, 발송, 스케줄이 동작한다.

패치 SHA-256: `1b9fbed44f14bebe91b2f772ebca7d0fa8c44abfe6d2c8747a46755abfc1578e`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `68087c611f887f1be134fea3d562a0c8d80c572b276317d33c50c625fa98e22f` | `53556243666aef8a63882ed3515d23b6bd0e341113a8e4acb056072939ce791d` |
| `public/app.js` | `af0e5224134378cd41fc31dc05ba9fa300568a3ed3796e18c3e5c098b56b6785` | `c4fde7005e7e2645a0833580ebaf83eca071759ee14d0d21efbd00aa10c99c57` |
| `public/styles.css` | `7e0970fa36adb110d6b2f64b0d205b1906e2fc988f20384aca328304e99b903a` | `1556cc8065bd21b0e633e12cffac1e3472e7cfdb693c98a0aef110484e5886d2` |
| `public/yt-report.js` | `6f36850a464958ccc2b55bfc5d6250e3865410a90ef572a7f159b452acf94cff` | 변경 없음 |
| `server.js` | `bfa9ff6d…` (이 작업 공간에는 라이브 파일 전체가 없음) | 패치 적용 후 `sha256sum server.js` |
| `lib/report-mail.js` | 없음 | `6b29cf60e50460c236da6e11df59249a8ba97ce9128861e584d88692524fcb6a` |
| `test/report-mail.test.js` | 없음 | `da4b07250de2603165dd1f93d434565fe49c58e5ed25c2385ec42de12c64f5fb` |

적용: 앱 루트에서 `patch -p1 < report-mail/onepost-report-mail.patch`

테스트: `node --test test/report-mail.test.js` 4개 통과. 메일은 가짜 전송만 사용한다.

본문은 HTML과 14일짜리 보기 링크다. 서버에서 PDF를 만들지 않는다. 주간 리포트 숫자가 없으면 "주간 리포트 데이터가 없습니다."만 적는다.
