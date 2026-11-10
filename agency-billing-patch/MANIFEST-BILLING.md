# 대행 자동결제 패치

배포하지 않음. 실결제 없음. 기본값은 꺼짐. 목(mock)만 사용한다.

패치 SHA-256: `04267e13d5fc32eacf2f885bbfa1763b78bb11dfddb90d36bd91b860c65f7877`

이전 패치 `185ca7db77428587fb4183c9529070599907cbdf18d1ab9f9e70b672fca61404` 를 대체한다. 라이브 `server.js` 에 직접 적용한다. 이미 옛 패치를 적용한 트리에는 다시 적용하지 않는다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 원본에 패치를 적용한 뒤 계산. 계정 리터럴 8줄은 문맥에 없음 |
| `lib/agency-billing.js` | 없음 | `a5d92e061ddaf39187aade5c7990bb8ba6a68ebb22f9e1c6cea44abef426ad94` |
| `test/agency-billing.test.js` | 없음 | `29c800bef572b0e52042d1c52490715d839b07ca56fd5c6ab13b6b2e7bc63592` |

해지 신청은 결제 횟수와 관계없이 접수하고 기록한다. 이미 3회 이상 결제했으면 효력은 신청한 달의 말이다. 3회 미만이면 세 번째 결제가 끝나는 달의 말까지 청구하고, 그다음부터 멈춘다. 위약금 필드는 없다.

데이터 파일 `data/agency-billing.json` 은 기능을 켠 뒤 첫 저장 때 생긴다. `package.json` 은 바꾸지 않는다.

켜는 방법: 환경 변수 `AGENCY_BILLING_ENABLED=1`. 기본값은 꺼짐이며 새 주소는 404다. 기본 청구 함수는 네트워크를 호출하지 않는다.

테스트: `node --test test/agency-billing.test.js` 5개 통과. 포트원 호출은 목이다.
