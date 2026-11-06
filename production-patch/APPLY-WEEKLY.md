# 주간 리포트 증분 패치

기준은 2026-11-06 12:39 KST 소스에 채널 분석 패치 `dcbe469`가 이미 적용된 트리입니다. 이 패치는 그 위에만 얹습니다. GitHub 스켈레톤을 라이브에 덮어쓰지 않습니다. `lib/insights.js` 수집기와 기존 스냅샷 파일은 바꾸지 않습니다. 라이브에는 아직 적용하지 않습니다.

## 묶음 파일과 SHA-256

| 파일 | SHA-256 |
| --- | --- |
| `onepost-weekly-report.patch` | `d592996158231e67fb80e4d1491a9f9b8234f20e1e0058f79925218a8014085d` |
| `fonts/NotoSansKR-Regular.ttf` | `c7a87157b2381a8b5d3e7831f7faa57d34e73dd149ea20b89c7d23609cd7efe5` |
| `fonts/OFL.txt` | `1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9` |

패치를 적용한 뒤 `package-lock.json` SHA-256 은 `a4a358194b52e2594e8706dfaca79d966c54b4d9406e7da5b077c4979662f8bd` 입니다. `package.json` SHA-256 은 `c35c543b68524b61be1e454e8a8f340ec7dddba9c66fcf69a0b58e80b0ebaa49` 입니다. `pdfkit` 버전은 `0.15.2` 입니다.

글꼴은 Noto Sans KR Regular 의 한글 서브셋이며 SIL Open Font License 1.1 입니다. 라이선스 원문은 `fonts/OFL.txt` 입니다. 글꼴 파일은 패치 diff 안에 넣지 않고 같이 복사합니다. 배포 장비의 시스템 글꼴 경로에 의존하지 않습니다.

## 적용

```sh
cd /opt/onepost/sns-publish-console
patch -p1 --dry-run < onepost-weekly-report.patch
patch -p1 < onepost-weekly-report.patch
mkdir -p assets/fonts
cp fonts/NotoSansKR-Regular.ttf assets/fonts/NotoSansKR-Regular.ttf
cp fonts/OFL.txt assets/fonts/OFL.txt
npm ci
node --test test/weekly-report.test.js test/channel-analysis.test.js
```

`--dry-run` 이 실패하면 중단합니다. `npm ci` 는 패치된 `package-lock.json` 을 사용합니다.

## 동작

- `GET /api/stores/:storeId/weekly-report.pdf` 는 첨부 PDF 입니다.
- 표시 시각은 `YYYY-MM-DD HH:mm 한국시간` 입니다.
- 1페이지는 요약만, 채널 상세는 다음 장부터입니다.
- YouTube 누적값 0은 수집 시각이 2026-11-06 13:27:49 한국시간 이전이거나 시각이 없으면 실제 0으로 단정하지 않습니다. 그 시각 이후의 숫자 0은 실제 0입니다. 레코드를 고치지 않습니다.
