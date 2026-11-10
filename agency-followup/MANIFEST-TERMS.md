# 대행 약관·환불 초안 패치

배포하지 않음. 법률 자문이 아님. 대표 확인 전이다.

패치 SHA-256: `35d7789e985f81df7de839ab79aefd02bedd4850cb02888e263e28889f63f3b4`

| 파일 | 기준 | 적용 후 |
| --- | --- | --- |
| `public/terms.html` | `123924798b987be43e4b63ad315c1bcaeeffe27b9a9ef7863c917e4a08cde6ab` | `6f1ce660e778432d6d0a2cd631805b1f7c9d57e4a8e6fc610f254ef84fecd003` |
| `public/refund.html` | `b03d313778b2bbb76ecbf98a9b7a943c0b3bc1ebf90f722543d52ae9cf6b886c` | `25724d26010b63e9624329ed0ae327621f8fbbb1664057ff3449e8acf03b085c` |
| `test/agency-terms.test.js` | 없음 | `cf09e364c2d774bdee0340bfe0a97d6b4c487a09f9719a20d49b05acfb5d9f3b` |

콘솔 9,900원 조항은 유지한다. 환불과 위약금은 ［미정］이다.

롤백: `patch -R -p1 < onepost-agency-terms.patch`

테스트: `node --test test/agency-terms.test.js` 통과.
