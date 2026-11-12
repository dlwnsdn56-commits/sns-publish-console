# 채널별 설명글

배포하지 않음. PR #14, PR #15는 수정하지 않음. 기준은 라이브(PR #15) 파일.

기본 설명글은 나머지 채널에 쓰고, 트위터와 스레드는 칸이 비어 있으면 기본 설명글을 씁니다.

패치 SHA-256: `775ba6504546192ab754a1f325cf27dccfd07b6aa64f17b4a36389d7aa38d375`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `53556243666aef8a63882ed3515d23b6bd0e341113a8e4acb056072939ce791d` | `ba46fb6f5f5151a289589ed49368d104724e81cb31677937965c53a77796cade` |
| `public/app.js` | `c4fde7005e7e2645a0833580ebaf83eca071759ee14d0d21efbd00aa10c99c57` | `1689b84fd9d87690f1b348d1f748db51cabc75e276610d7cbb195c42e26f2a77` |
| `public/styles.css` | `1556cc8065bd21b0e633e12cffac1e3472e7cfdb693c98a0aef110484e5886d2` | `a56fb208e59d0ca58196411e9f92f08f7750122c303a7c4769eed8c372f9361c` |
| `server.js` | `1812a68aec1259c6d1a7b34db6e9a46ae6848051510af76635bd0a53d0cdf8d7` | 적용 후 `sha256sum server.js` |
| `lib/publish-job.js` | `f7284fe39e5eda6e69c757b37aa3635670e5ec52120856b34fe01076a3b2af9d` | `e2a944787fec0f7202524d7b9c08f88e90ebfa11137dd56c320f64e445940d58` |
| `lib/channel-caption.js` | 없음 | `f4284cc65f1a6fd3879582cffc1ab91ef30b0845b0c8f656019dbffea0c388a4` |
| `lib/mcp.js` | 라이브 파일 없음 | 적용 후 `sha256sum lib/mcp.js` |
| `lib/report-mail.js` | `a7995fa4c59539a3bcaea1fcbd17c68926013a88a23be9d10c56eb970f064e55` | 변경 없음 |
| `test/channel-caption.test.js` | 없음 | `cb219bd3374feb8f9eadcb1f43a0dd059cefe8e6bba5517f873d22ec5b9dc59b` |

적용: 앱 루트에서 `patch -p1 < channel-captions/onepost-channel-captions.patch`

테스트: `node --test test/channel-caption.test.js` 3개 통과. 실제 SNS 발행은 하지 않습니다.
