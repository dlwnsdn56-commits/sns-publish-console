# 홈에서 구글 블로그 카드 숨김

배포하지 않음. 서버 코드와 저장된 연결은 그대로다.

패치 SHA-256: `211f0575482f109b7ca5f6623e49f1461efe6bf75c326e5b7cbd4d6173101e1d`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` | `adcc8a6812a833c6346c29022a30a9ccfd4fa2cd1aaf7338c3fc6e222466fb3d` |
| `public/app.js` | `1343a93e0a8d1571174bd7afefcd0c757de621eb14fe96c1f5fe28f9571bb8c6` | `8d2d8cfc8a5e1c523d3a7a114d7e78c209cba30023bb46ff5d25f888cfe2489a` |
| `public/styles.css` | `0386dd68b43174faaceae5012069d32ac03e8641d3482cbfae9cd06d2f798fbe` | `b994966c04f05f9dc5997ecdd6dd94e2d9903f435171e0e19b15add1456c8700` |
| `test/home-channels.test.js` | 없음 | `91104fd0422fabea820d4c5d85ef4143e2aadcf4efc335988c54e6105a0fae37` |

홈 채널은 유튜브, 인스타, 페이스북, 스레드, 틱톡, 트위터, 네이버 클립입니다. 영상제작 칸은 그대로입니다. 올리기 화면의 구글 블로그 탭과 채널 선택도 숨깁니다.

테스트: `node --test test/home-channels.test.js` 1개 통과.
