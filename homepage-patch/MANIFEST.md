# 홈페이지 패치 매니페스트

배포하지 않음. 풀 리퀘스트 머지하지 않음. 주간 리포트 패치(`onepost-weekly-report.patch`)와 별개.

## 기준

| 파일 | 역할 | SHA-256 |
| --- | --- | --- |
| `public/ether.html` | 패치 전 기준. 내보내기 = 확인된 라이브 | `bceaad77ed7923cb514a777786c81ad3ea4d1b6f5cc70f00cd6e2d80bd8c552f` |
| `public/ether-sua.html` | 변경 없음 | `58381e71bf91ad7dfaf3a9eb6a216271a1cc005d5e912e079d34d8c12dd7219c` |

패치 후 `public/ether.html` SHA-256: `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`

패치 파일 `onepost-ether-dalgomaebgo.patch` SHA-256: `6d21d8fce9c393ba1ab0abb59cb02be00c07d2947d79c540d4faccdfaf5581e1`

테스트 `test/ether-dalgomaebgo.test.js` SHA-256: `509467dcf79950845cf3c7063009c505b469fdace715ccd0fb9c91a9e3b8499d`

## 바꾼 파일

1. `public/ether.html`
2. `test/ether-dalgomaebgo.test.js`

로고 파일은 바꾸지 않는다. 내보내기 목록은 `public logos (png/jpg)`를 제외한다. HTML의 헤더 주소는 기존 `/logo-aether-mark.png`다.

## 고객 문구

`에테르가 운영을 맡은 달고맵고의 유튜브 채널입니다. 제품과 브랜드를 소개하는 영상을 만나보세요.`

내부 설명(전체 영상을 만들지 않았다는 문장, 썸네일·삽입 안내)은 화면에서 뺐다. 영상 제목과 유튜브 링크는 그대로다.

## 넣은 영상 6개

채널 https://www.youtube.com/channel/UCbuhFCo4kRgg3k1hZA0zkZA

| id | 페이지 | oEmbed 제목 |
| --- | --- | --- |
| H9L55vqPBg4 | watch | 언제나 맛있게 먹고 싶다면 김치 핫소스 |
| v-Lhi4D9DBM | watch | HEALTH MEETS HEAT : DALGO MAEBGO |
| E2KsdVWaZOA | shorts | Dalgo Maebgo Smash Burger \| Sweet. Spicy. Kimchi #dalgomaebgo |
| qo8KOEd-0W4 | shorts | Cheesy Beef Rolls with Dalgo Maebgo \| The Sauce That Cuts Through Cheese  #dalgomaebgo |
| DkhVDGMPr00 | shorts | Halloween Snack: Skull Cucumbers + Dalgo Maebgo |
| Q2cB91Bh3RQ | shorts | Carrot ghosts. Cucumber ghosts. Then the dip. |

확인만 하고 섹션에 넣지 않은 영상: `Sgj8db8tU2g`.

썸네일 URL은 `https://i.ytimg.com/vi/<id>/hqdefault.jpg`. 처음 HTML에는 유튜브 iframe이 없다. 각 카드에 유튜브 링크가 있다. 이 개정에서 재생은 다시 확인하지 않았다.
