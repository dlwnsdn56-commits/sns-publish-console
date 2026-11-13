# 유튜브 올리기 옵션

미리보기만. 배포하지 않음. 기준은 PR #16이 적용된 라이브. 한 장 보고서 패치와는 따로입니다.

패치 SHA-256: `82bf0f2e7df98945e0bd45dafadd376153933a632e4ed878d856710fcfae128a`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `3672305c8c70031ef346332491692611bd6f6efe60d263d02a22d39c904320d4` | `8c4c1ec763b170dcee79b464b1ca20c8909f80f5d07dfb668963b019295fc75e` |
| `public/app.js` | `e1efd05f3d008459197e89df091e83c483b6a32fb40c51782f56908e23b018f4` | `67870940195780d1f48cbedd51fe0da4b3ffba3530e1e2e56d91bc48dbc84494` |
| `public/styles.css` | `7b3088690087dee2ccd31b37140a2d6fef321c837c2df6fb3ee97a10e8070696` | `d26f03afd3d0105a004bf1aaa24f06fa2b25b8994787f044e1a58a73fecc16f0` |
| `lib/publish-job.js` | `e2a944787fec0f7202524d7b9c08f88e90ebfa11137dd56c320f64e445940d58` | `cfa88cba1bcd126dee8f573d5bea3c8c7a1ebeed2e7a10f3d4d680b7b50c6e77` |
| `server.js` | `48a072c248601f018e4fcad90582beca52737ecc1a5ea9d2a72de464621ccf72` | 변경 없음 |
| `lib/youtube-options.js` | 없음 | `ffe0ace23301fd7b9918b81af430a7494df8eb912c7a28a9f70d71b74be7300a` |
| `test/youtube-options.test.js` | 없음 | `8375988365877f6ba9160050cf50f807dc259bde596895917b5e6bf1dfbeb47b` |

`privacyStatusFor`는 바꾸지 않습니다. AI 표시는 체크할 때만 켜집니다.

테스트: `node --test test/youtube-options.test.js` 4개 통과.
