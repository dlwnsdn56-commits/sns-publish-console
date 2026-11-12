# 홈에서 구글 블로그 카드 숨김

배포하지 않음. 서버 코드와 저장된 연결은 그대로다.

패치 SHA-256: `7fcb45814ddcea202f199d4dee8ec25ca4b67bfb62738aa25f9260332af672d5`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` | `744784de7ea0a99cf9fd3f7c2c02365d3b9f24dec06f19678c46e168b824c77f` |
| `public/app.js` | `1343a93e0a8d1571174bd7afefcd0c757de621eb14fe96c1f5fe28f9571bb8c6` | `8d2d8cfc8a5e1c523d3a7a114d7e78c209cba30023bb46ff5d25f888cfe2489a` |
| `public/styles.css` | `0386dd68b43174faaceae5012069d32ac03e8641d3482cbfae9cd06d2f798fbe` | `b5cf33f954f1ccdf6f88456f08d19a25d801cf9ab482527322cbdd321a4847d0` |
| `test/home-channels.test.js` | 없음 | `91104fd0422fabea820d4c5d85ef4143e2aadcf4efc335988c54e6105a0fae37` |

홈 채널은 유튜브, 인스타, 페이스북, 스레드, 틱톡, 트위터, 네이버 클립입니다. 네이버 클립 버튼은 칸 너비에 맞춰 한 줄씩 보이게 했습니다. 영상제작 칸은 그대로입니다. 올리기 화면의 구글 블로그 탭과 채널 선택도 숨깁니다.

테스트: `node --test test/home-channels.test.js` 1개 통과.
