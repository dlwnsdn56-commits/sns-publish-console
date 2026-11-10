# 해지 문구 패치

배포하지 않음. 병합하지 않음. 라이브에 이미 올라간 규칙 안내(index `a2950113…`, ether `90f838b5…`, agency `42d251f7…`)만 대상으로 한다.

패치 SHA-256: `9350c3a68de2e5b36394497a9cdbb6307127917750ee3a9c6d39b628cf25dbd5`

세 화면의 짧은 문장은 같다.

`해지 신청은 언제든 가능, 최소 3개월 이용기간이 끝나는 달 말에 해지`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `a295011300a920f8a525a47521c1935b3e858b838842a2d173d42dd18942a0f7` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` |
| `public/ether.html` | `90f838b590e55521348b927f5ea48ea3b7c1eb6972d19fc87ced76cb76eddd55` | `fd5b92a4adb47b9d123f99985b2bcd3a99c802cc7fbb4548f192a222977bca9b` |
| `public/agency.html` | `42d251f74a891aa7337068e8b8b02ac3d4f3f903848e86731237b99b066dfbec` | `f2ef0708db9c26e4bc3d233b8030415df0ad7665a13cd5a2cc0ce0e78b84886c` |
| `test/agency-rules.test.js` | `202cb3f2af1beb8fc342b664ab9a19511a2bd5f1dc423fe5bbbd00b90a692b9d` | `0295cd87556f46c91b9da21474f3da64af29466d5be8c2dc76d181c1afffb637` |

가격, 이월, 자동결제(준비 중), 월 9,900원 구분은 그대로다. `ether-sua.html` 은 포함하지 않는다.

테스트: `node --test test/agency-rules.test.js` 1개 통과.
