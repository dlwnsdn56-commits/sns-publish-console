# 대행 약관 결정 반영 패치

배포하지 않음. 법률 자문이 아님. 콘솔 월 9,900원 조항은 유지.

패치 SHA-256: `20e6639fa2b09cf8075c1ed0ef28830f2ba42fa8d137d76ca452b94103c6baef`

기준은 운영 중인 약관이다. PR6의 ［미정］ 초안이 아직 배포되지 않았으므로 그 패치 위가 아니라 운영 파일에 적용한다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/terms.html` | `123924798b987be43e4b63ad315c1bcaeeffe27b9a9ef7863c917e4a08cde6ab` | `0d53d5c911f937e2218e295c8e10378f188553bc46e47816eabba5ecb0634d44` |
| `public/refund.html` | `b03d313778b2bbb76ecbf98a9b7a943c0b3bc1ebf90f722543d52ae9cf6b886c` | `50dd6a26094b1e8b7455de6645af156fe9b7f688d9abeb82dccc95dc7d8ed898` |
| `test/agency-terms.test.js` | 없음 | `cf09e364c2d774bdee0340bfe0a97d6b4c487a09f9719a20d49b05acfb5d9f3b` |

롤백: `patch -R -p1 < onepost-agency-terms-decided.patch`

테스트: `node --test test/agency-terms.test.js` 통과.
