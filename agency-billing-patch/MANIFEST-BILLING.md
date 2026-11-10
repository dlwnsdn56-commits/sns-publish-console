# 대행 자동결제 패치

배포하지 않음. 실결제 없음. 기본값은 꺼짐. 목(mock)만 사용한다.

패치 SHA-256: `27fb8ec7cfd5cb216249539967dc44d35736a7161055c329f6c123ad781dca06`

이전 패치 `04267e13d5fc32eacf2f885bbfa1763b78bb11dfddb90d36bd91b860c65f7877` 을 대체한다. 라이브 `server.js` 에 직접 적용한다. 이미 옛 패치를 적용한 트리에는 다시 적용하지 않는다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 원본에 패치를 적용한 뒤 계산. 계정 리터럴 8줄은 문맥에 없음 |
| `lib/agency-billing.js` | 없음 | `27b2751a279f78eb03f4b0a7bc79383dc868e031bfc5780f5a3f75809249bc4f` |
| `test/agency-billing.test.js` | 없음 | `a7386bb34d72c7974cef6627fa062bf638671e2c15bf3eae82332f750fbd18bc` |

결제 실패 후 7일이 지나도 결제되지 않으면 상태를 `terminated` 로 두고 이후 청구를 멈춘다. 일시정지(`suspended`)로 두지 않는다.

미착수 편 정산(2-C)과 회사 사정으로 기간을 늘리는 일(6-A)은 금액·일수 공식이 없어 TODO 주석만 두었다.

테스트: `node --test test/agency-billing.test.js` 5개 통과. 포트원 호출은 목이다.
