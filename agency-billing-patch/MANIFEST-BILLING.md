# 대행 자동결제 패치

배포하지 않음. 실결제 없음. 기본값은 꺼짐.

패치 SHA-256: `185ca7db77428587fb4183c9529070599907cbdf18d1ab9f9e70b672fca61404`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 원본에 패치를 적용한 뒤 계산. 계정 리터럴 8줄은 문맥에 없음 |
| `lib/agency-billing.js` | 없음 | `e5fc8bc406f599efab51247d7c2b3c0f4ff490c57735408e5a972d04eb042d3e` |
| `test/agency-billing.test.js` | 없음 | `8706a975939a2f3428e4dab2e509a1e85543234aa654b7b30ed3b95a2691b496` |

데이터 파일 `data/agency-billing.json` 은 기능을 켠 뒤 첫 저장 때 생긴다. 데이터베이스 마이그레이션은 없다. `package.json` 은 바꾸지 않는다.

켜는 방법: 환경 변수 `AGENCY_BILLING_ENABLED=1`. 웹훅 검증에는 `PORTONE_WEBHOOK_SECRET` 이 필요하다. 두 값이 없으면 기존 화면은 그대로이고, 새 주소는 404다. 기본 청구 함수는 네트워크를 호출하지 않는다.

롤백: `patch -R -p1 < onepost-agency-billing.patch` 후 `lib/agency-billing.js` 와 `test/agency-billing.test.js` 가 남으면 지운다. `data/agency-billing.json` 은 결제 기록이므로 지우기 전에 백업한다.

테스트: `node --test test/agency-billing.test.js` 4개 통과. 포트원 호출은 목이다.
