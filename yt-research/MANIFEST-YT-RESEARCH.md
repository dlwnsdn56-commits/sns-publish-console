# 유튜브 리서치 기본판

배포하지 않음. 병합하지 않음. 기능 기본값은 꺼짐. 유튜브 Data API v3만 사용하고, 키는 환경 변수 `YOUTUBE_API_KEY`에만 둔다.

패치 SHA-256: `d0067ec1365c99c0a7ddd5b3964695aae41a787acb2c48866e6e5873123bdf55`

기준은 2026-11-12에 받은 라이브 콘솔이다. 약관·환불·요금 페이지와 대행 결제(PR8)는 포함하지 않는다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `server.js` | `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753` | 라이브 원본에 패치를 적용한 뒤 계산. 이 환경에는 원본 파일이 없어 적용 후 해시를 적지 않음 |
| `public/index.html` | `363212d66040f875487e7c863514787eadcabeaa329bb4e6f46f6089fd2a84c6` | `58679bf95c6f538c854190ac26305adf19d593be983b71bf8e814af5aa7f3d6b` |
| `public/app.js` | `1343a93e0a8d1571174bd7afefcd0c757de621eb14fe96c1f5fe28f9571bb8c6` | `21f228a06e9a0b6d7c73592a981a87ee7b07e01a2f9bd5c39986ed2fd1cb8763` |
| `public/styles.css` | `0386dd68b43174faaceae5012069d32ac03e8641d3482cbfae9cd06d2f798fbe` | `0f935b2f19fbc0c004a9a9a5e4513595ebe63b8f3de04beef6e239ed8cbb445a` |
| `lib/yt-research.js` | 없음 | `0db65ba258243d93b3349442803016382e814ad74a05fae042730065e24f6e4e` |
| `test/yt-research.test.js` | 없음 | `1e9deb04fe13df243dcf5ca05205cc707abdc235ae31e515ec25f529741b93fe` |

켜는 방법: `YT_RESEARCH_ENABLED=1` 과 `YOUTUBE_API_KEY`. 둘 중 플래그가 꺼져 있으면 `/api/yt-research` 는 404이고 화면에는 "유튜브 리서치는 꺼져 있습니다."가 나온다.

캐시 파일 `data/yt-research-cache.json` 은 기능을 켠 뒤 첫 저장 때 생긴다. 검색 결과 12시간, 채널·영상 숫자 24시간. 사용자 사이에 공유한다.

테스트: `node --test test/yt-research.test.js` 5개 통과. 유튜브 호출은 목이다.
