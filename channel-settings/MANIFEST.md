# 채널별 게시 옵션과 기본값

미리보기만. 배포하지 않음. 기준은 PR #16 라이브. 이전 유튜브 옵션 패치를 이 파일로 대체합니다.

패치 SHA-256: `ba7083560831eea3a37b6cd931abe05cfd7305ef536b5cd8aabf8c47ad418318`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `3672305c8c70031ef346332491692611bd6f6efe60d263d02a22d39c904320d4` | `7551cbbeb09f8fa0cf11fbaed72b69c86a9a1977180cd90f119b81cc2f5fae76` |
| `public/app.js` | `e1efd05f3d008459197e89df091e83c483b6a32fb40c51782f56908e23b018f4` | `aecdd9d94a0cd3bf89e5ef60bf5f5caf0e51e31022624c26d9111e65ae917a86` |
| `public/styles.css` | `7b3088690087dee2ccd31b37140a2d6fef321c837c2df6fb3ee97a10e8070696` | `44b79d8bebed4aebec71f1d49f8c9d207059e402254c309c8d837202691e7897` |
| `lib/publish-job.js` | `e2a944787fec0f7202524d7b9c08f88e90ebfa11137dd56c320f64e445940d58` | `94fa63ea6a2c298efec8c5afeb1f34fb11ac0e137f685737a4fc578497aa3931` |
| `server.js` | `48a072c248601f018e4fcad90582beca52737ecc1a5ea9d2a72de464621ccf72` | 변경 없음 |
| `public/channel-settings.js` | 없음 | `830a5ed1d8fde2bc2841c83e16ff69a076564caebbc3bc51b7181b1dee2fb4ef` |
| `lib/channel-defaults.js` | 없음 | `40f692aeb36f53187298eea6c3ca5fe83209b1436eb4aeb984c44a998ab3cad6` |
| `lib/channel-settings.js` | 없음 | `88a86a9f847fe387827508f41d46ef1b480d0c614d511c243c48721a9c38cee2` |
| `lib/channel-defaults-routes.js` | 없음 | `d224ab2617be8af1c5b13de40cd37073e4d94f33fb28aae98f58cd5e49753e1c` |

`privacyStatusFor`와 설명글 본문은 그대로입니다. 불러오기 API는 server.js에서 `mountChannelDefaults(app, { rootDir: __dirname, getClient })` 한 줄이 필요합니다. 체크된 기본값은 발행 시 `data/channel-defaults.json`에 저장됩니다.

테스트: `node --test test/channel-settings.test.js` 4개 통과.
