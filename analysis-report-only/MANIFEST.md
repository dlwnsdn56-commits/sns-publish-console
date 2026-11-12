# 채널 분석은 한 장 보고서만

배포하지 않음. 조회수 탭과 유튜브 리서치는 바꾸지 않음. 서버 데이터는 그대로.

패치 SHA-256: `c53c2f9fdc173939809f5d8cd9209acbf5e18d841522f462a10645528e4c0c1a`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `68087c611f887f1be134fea3d562a0c8d80c572b276317d33c50c625fa98e22f` | `67cdd96a7c7e33c88fb11e8e4a33442d2cb3971d00b51c34316772234d1675e8` |
| `public/app.js` | `af0e5224134378cd41fc31dc05ba9fa300568a3ed3796e18c3e5c098b56b6785` | `7a47f7b21fda91c273981bf996f8132291739de58887f4eaf22eb63c8708e380` |
| `public/styles.css` | `7e0970fa36adb110d6b2f64b0d205b1906e2fc988f20384aca328304e99b903a` | `3f331d0e50decb6d20d5fc61dbb95846c338a93fda45e5103fabe5931b199647` |
| `public/yt-report.js` | `6f36850a464958ccc2b55bfc5d6250e3865410a90ef572a7f159b452acf94cff` | 변경 없음 |
| `test/analysis-report-only.test.js` | 없음 | `8c9d94176d3244de8d0b35f2d34cdc0a017db382c5280d50b77e89ed1aa4f2f6` |

테스트: `node --test test/analysis-report-only.test.js` 1개 통과.
