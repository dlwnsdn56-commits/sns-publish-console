# 대행 자동결제 패치

배포하지 않음. 실결제 없음. 기본값은 꺼짐. 목(mock)만 사용한다.

패치 SHA-256: `819e110b803cca989cb96e7894ecbb8813532f1217ce707757f95aadc6ea54b2`

이전 패치 `27fb8ec7cfd5cb216249539967dc44d35736a7161055c329f6c123ad781dca06` 을 대체한다. 차이는 2-C TODO 주석뿐이다. 청구 로직과 플래그 기본값은 그대로다. 라이브 `server.js` 에 직접 적용한다. 이미 옛 패치를 적용한 트리에는 다시 적용하지 않는다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 원본에 패치를 적용한 뒤 계산. 계정 리터럴 8줄은 문맥에 없음 |
| `lib/agency-billing.js` | 없음 | `57bb94beb911b90003cb66107ebce0663c1f0790fd156b5ba29d49c6d3fc208f` |
| `test/agency-billing.test.js` | 없음 | `a7386bb34d72c7974cef6627fa062bf638671e2c15bf3eae82332f750fbd18bc` |

결제 실패 후 7일이 지나도 결제되지 않으면 상태를 `terminated` 로 두고 이후 청구를 멈춘다. 일시정지(`suspended`)로 두지 않는다.

2-C TODO는 미착수 영상을 환불하지 않고 해지 효력일까지 제작·납품한다는 뜻만 적는다. 이 모듈은 그 금액을 계산하지 않는다. 6-A 기간 연장의 길이는 여전히 TODO다.

테스트: `node --test test/agency-billing.test.js` 5개 통과. 포트원 호출은 목이다.
