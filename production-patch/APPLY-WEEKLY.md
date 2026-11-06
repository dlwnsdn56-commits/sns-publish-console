# 주간 리포트 증분 패치

기준은 2026-11-06 12:39 KST 소스에 `dcbe469` 채널 분석 패치가 이미 적용된 트리입니다. GitHub 스켈레톤 커밋을 라이브에 덮어쓰지 않습니다. 수집기 `lib/insights.js` 는 이 패치에서 바꾸지 않습니다. 기존 스냅샷 파일도 수정하지 않습니다.

## 파일

- `onepost-weekly-report.patch`
- `fonts/NotoSansKR-Regular.ttf` 를 `assets/fonts/NotoSansKR-Regular.ttf` 로 복사

## 적용

라이브에는 지금 적용하지 않습니다. 나중에 적용할 때는 채널 분석 패치가 들어간 사본에서만 다음을 실행합니다.

```sh
cd /opt/onepost/sns-publish-console
patch -p1 --dry-run < onepost-weekly-report.patch
patch -p1 < onepost-weekly-report.patch
mkdir -p assets/fonts
cp NotoSansKR-Regular.ttf assets/fonts/NotoSansKR-Regular.ttf
npm install pdfkit@0.15.2
node --test test/weekly-report.test.js test/channel-analysis.test.js
```

`--dry-run` 이 실패하면 중단합니다.

## 화면과 파일

- `GET /api/stores/:storeId/weekly-report?days=7&end=YYYY-MM-DD`
- `GET /api/stores/:storeId/weekly-report.pdf` 는 `Content-Disposition: attachment` PDF 입니다. 브라우저 인쇄 대화상자가 아닙니다.
- 세션이 없으면 401, 그 사용자의 가게가 아니면 404 입니다.
- 기존 `/insights` 와 `/analysis` 는 그대로 둡니다.

## 운영 스냅샷으로 확인된 한계

2026-11-06 14:20 KST 읽기 전용 집계: 날짜는 2026-11-04, 05, 06 뿐입니다. 11월 6일로 끝나는 7일 창에는 수집이 3일, 빠진 날이 4일입니다. 숫자 누적 조회수가 2점 이상인 쌍은 달력 간격이 7일이 아닙니다. 그래서 이 패치는 7일 경계 차이와 이전 주 비교를 만들지 않고, 관측된 두 점 사이의 차이만 그 날짜와 함께 보여 줍니다. YouTube에 0으로 저장된 구독자는 실제 0으로 단정하지 않습니다.
