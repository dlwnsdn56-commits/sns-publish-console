# 홈페이지 패치 매니페스트

배포하지 않음. 풀 리퀘스트 머지하지 않음. 주간 리포트 패치(`onepost-weekly-report.patch`)와 별개.

## 기준

| 파일 | 역할 | SHA-256 |
| --- | --- | --- |
| `public/ether.html` | 패치 전 기준. 내보내기 = 확인된 라이브 | `bceaad77ed7923cb514a777786c81ad3ea4d1b6f5cc70f00cd6e2d80bd8c552f` |
| `public/ether-sua.html` | 변경 없음 | `58381e71bf91ad7dfaf3a9eb6a216271a1cc005d5e912e079d34d8c12dd7219c` |

패치 후 `public/ether.html` SHA-256: `4ab6101f64f7eb359a99f4d779afd98da7226645bb85226e5b79c7bca8cc436e`

패치 파일 `onepost-ether-dalgomaebgo.patch` SHA-256: `07c4d60ceedf1915049d2b7b6fffc46428c714cc4b0f7daca61396b87eadc676`

테스트 `test/ether-dalgomaebgo.test.js` SHA-256: `7d2babb9096975d901a60665eadfa6792f3dec87619798713b7008f18f8d9a4d`

## 바꾼 파일

1. `public/ether.html`
2. `test/ether-dalgomaebgo.test.js`

## 넣은 영상 6개

채널 https://www.youtube.com/channel/UCbuhFCo4kRgg3k1hZA0zkZA
oEmbed author_name은 일곱 개 모두 DALGO MAEBGO.

| id | 페이지 | oEmbed 제목 |
| --- | --- | --- |
| H9L55vqPBg4 | watch | 언제나 맛있게 먹고 싶다면 김치 핫소스 |
| v-Lhi4D9DBM | watch | HEALTH MEETS HEAT : DALGO MAEBGO |
| E2KsdVWaZOA | shorts | Dalgo Maebgo Smash Burger \| Sweet. Spicy. Kimchi #dalgomaebgo |
| qo8KOEd-0W4 | shorts | Cheesy Beef Rolls with Dalgo Maebgo \| The Sauce That Cuts Through Cheese  #dalgomaebgo |
| DkhVDGMPr00 | shorts | Halloween Snack: Skull Cucumbers + Dalgo Maebgo |
| Q2cB91Bh3RQ | shorts | Carrot ghosts. Cucumber ghosts. Then the dip. |

확인만 하고 섹션에 넣지 않은 영상: `Sgj8db8tU2g` (Three cuts. An almond nail. Then the red. #dalgomaebgo).

썸네일 URL은 `https://i.ytimg.com/vi/<id>/hqdefault.jpg`. 처음 HTML에는 유튜브 iframe이 없고, 클릭할 때 `youtube-nocookie.com/embed/<id>`를 만든다. 각 카드에 유튜브 링크가 있다.

재생을 끝까지 확인하지 않았다. 헤드리스 크롬에서 한 편(H9L55vqPBg4)을 눌렀을 때 iframe 주소는 만들어졌고 embed 응답은 HTTP 200이었으나, 화면은 "Sign in to confirm you're not a bot"이었다.
