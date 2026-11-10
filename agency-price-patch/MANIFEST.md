# 영상 제작 대행 가격 패치

배포하지 않음. 머지하지 않음. 80만원은 대행 문구에만 넣음. 원포스트 도구 요금 9,900원은 바꾸지 않음.

패치 SHA-256: `19ccc906eb740179225502a91fd416a8bf493a0ce289b32f679ca47853bf2cec`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `bdebb2fc14d4b885273b933211e5a73620e2f7e65cc1d6e8841d8c558747f763` | `94e27506d7f5619185fcf414b8eb6725bffdbbdffac683e2ede7d78766b33b8d` |
| `public/ether.html` | `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402` | `f617443ea74b2e33d25ef639d5efd77141879f1096fc6b37fc47971192123c1d` |
| `public/agency.html` | `0f17e20d57203481792c8800e476542882d851d80b5c37adf694c20ae23a88a7` | `4473c1984df69a8aa27ff64e06c4d1063cf275c808252118af179068166653f4` |
| `test/agency-price.test.js` | 없음 | `361a8695531c4bb24e7f77a1468b0dde8bfdc955a5e0cf66565ca9da57558908` |

바꾸지 않음: `server.js` `198e1955...`, `public/ether-sua.html` `58381e71...`, `public/app.js`, `public/pricing.html`, `public/terms.html`, `public/refund.html`, `public/help.html`.

`https://1post.kr/recruit/post.html` 은 별도 파일이 아니라 콘솔 `index.html` 이다. 인용된 예전 문구는 그 파일의 대행 광고 카드다. `1년 안 재충전` 문구는 운영 페이지에서 찾지 못해 자리표시를 넣지 않았다.

테스트: `node --test test/agency-price.test.js` 2개 통과. 1280px와 390px에서 가로 스크롤 없음.
