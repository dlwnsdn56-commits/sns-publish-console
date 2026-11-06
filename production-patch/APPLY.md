# 프로덕션 채널 분석 패치

이 파일은 GitHub 스켈레톤이 아니라, 2026-11-06 12:39:38 KST 자정된 프로덕션 소스 내보내기(`/opt/onepost/sns-publish-console`)에 대한 패치입니다. 패치 대상 해시은 `BASE_HASHES.json` 입니다.

이 저장소의 기존 채널 분석 코드는 스켈레톤용이며 프로덕션에 덮어쓰면 안 됩니다. 프로덕션에는 이 패치만 검토해서 적용합니다.

## 적용 위치

라이브 콘솔 디렉터리에서:

```sh
cd /opt/onepost/sns-publish-console
patch -p1 --dry-run < onepost-channel-analysis.patch
patch -p1 < onepost-channel-analysis.patch
node --test test/channel-analysis.test.js
```

`--dry-run` 이 실패하면 적용을 멈추고 파일을 통째로 교체하지 않습니다.

## 해시

`lib/insights.js`, `public/app.js`, `public/index.html`, `public/styles.css` 는 내보내기 시각의 라이브 해시와 같습니다.

`server.js` 만 다릅니다. 내보내기에서 DEMO_USER / REVIEW_USER 리터럴이 가려졌기 때문입니다. 패치의 server.js 덩어리는 조회수 새로고침 라우트 바로 뒤에 분석 라우트를 넣는 부분뿐이며, 그 가림 문자열을 포함하지 않습니다. 라이브 `server.js` 를 내보낸 사본으로 바꾸지 마세요. 자격 증명이 가림 값으로 바뀝니다.

## 패치가 하는 일

- `GET /api/stores/:storeId/channel-analysis`
- 세션 이메일의 `clientStore.getClient` 로 가게를 확인합니다. 다른 사용자 가게 id 는 404 입니다. 쿼리로 이메일을 바꾸지 않습니다.
- 선택한 가게의 연결 기록과 `data/insight-snapshots.json` 만 읽습니다. 제공자 API 를 호출하지 않습니다.
- 화면은 기존 사이드바의 가게 선택과 조회수 카드 스타일을 사용합니다.
- `lib/insights.js` 의 수집기는 이후 스냅샷부터 빈 통계를 0 으로 저장하지 않습니다. 이미 저장된 스냅샷은 이 패치가 다시 쓰지 않습니다.

## 하지 않는 일

배포, 결제, OAuth 변경, 게시, TikTok 심사 재신청, `.env` 수정, 고객 데이터 수정.
