# 대행 이월·3개월 안내 패치

배포하지 않음. 기준은 가격 패치 `19ccc906eb740179225502a91fd416a8bf493a0ce289b32f679ca47853bf2cec` 적용 후다.

패치 SHA-256: `c3a8dbc49b91212668ef408d9fd318a9230246c4538d43f19119bbdb5b555919`

| 파일 | 기준 | 적용 후 |
| --- | --- | --- |
| `public/index.html` | `94e27506d7f5619185fcf414b8eb6725bffdbbdffac683e2ede7d78766b33b8d` | `a295011300a920f8a525a47521c1935b3e858b838842a2d173d42dd18942a0f7` |
| `public/ether.html` | `f617443ea74b2e33d25ef639d5efd77141879f1096fc6b37fc47971192123c1d` | `90f838b590e55521348b927f5ea48ea3b7c1eb6972d19fc87ced76cb76eddd55` |
| `public/agency.html` | `4473c1984df69a8aa27ff64e06c4d1063cf275c808252118af179068166653f4` | `42d251f74a891aa7337068e8b8b02ac3d4f3f903848e86731237b99b066dfbec` |
| `test/agency-rules.test.js` | 없음 | `202cb3f2af1beb8fc342b664ab9a19511a2bd5f1dc423fe5bbbd00b90a692b9d` |

카드 자동결제는 `자동결제(준비 중)`과 `지금은 이 페이지에서 결제되지 않습니다`로만 적었다. 환불 금액은 없다.

롤백: `patch -R -p1 < onepost-agency-rules.patch`

테스트: `node --test test/agency-rules.test.js` 통과.
