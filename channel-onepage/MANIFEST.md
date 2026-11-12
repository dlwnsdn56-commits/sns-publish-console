# 채널 분석은 한 장, 블로그는 숨김

배포하지 않음. 기준은 PR #16이 적용된 라이브. `server.js`는 바꾸지 않음.

패치 SHA-256: `675aee65c655141d7234b783ec249870c6d0f4c9a753bcf93c44842d155d9667`

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `3672305c8c70031ef346332491692611bd6f6efe60d263d02a22d39c904320d4` | `75308185227caa0718f624f20aec1aa43aa32b3e62a611eb77997eb28db5a56b` |
| `public/app.js` | `e1efd05f3d008459197e89df091e83c483b6a32fb40c51782f56908e23b018f4` | `509f10d94a495b0891b33c0b87637cf1553894a2c0f59d1c3ec3ee70b2fcad91` |
| `public/styles.css` | `7b3088690087dee2ccd31b37140a2d6fef321c837c2df6fb3ee97a10e8070696` | `4e1726453699800b0a8ba27dc1008c026d29a011fe50511d5de18b5aad01d039` |
| `server.js` | `48a072c248601f018e4fcad90582beca52737ecc1a5ea9d2a72de464621ccf72` | 변경 없음 |

적용: `patch --dry-run -p1 < channel-onepage/onepost-channel-onepage.patch`
