# 채널별 설명글

배포하지 않음. 기준은 지금 라이브(PR #15까지). PR #16의 이전 패치 `775ba650…`는 `lib/mcp.js` 허크 순서가 어긋나 적용되지 않았다. 이 파일이 그 수정본이고, 네이버 클립도 트위터 칸을 쓴다.

패치 SHA-256: `162819a63a1bf7b3ebd43ebebe754972e751d32e749729b9a4cfc4a297a64a23`

`patch -p1 --dry-run`으로 확인했다. `lib/mcp.js`는 라이브 해시와 같은 파일을 다시 만들어 맞췄다. `server.js`는 호출부 문맥만 재구성했다.

| 파일 | 기준 SHA-256 | 적용 후 SHA-256 |
| --- | --- | --- |
| `public/index.html` | `53556243666aef8a63882ed3515d23b6bd0e341113a8e4acb056072939ce791d` | `3672305c8c70031ef346332491692611bd6f6efe60d263d02a22d39c904320d4` |
| `public/app.js` | `c4fde7005e7e2645a0833580ebaf83eca071759ee14d0d21efbd00aa10c99c57` | `e1efd05f3d008459197e89df091e83c483b6a32fb40c51782f56908e23b018f4` |
| `public/styles.css` | `1556cc8065bd21b0e633e12cffac1e3472e7cfdb693c98a0aef110484e5886d2` | `7b3088690087dee2ccd31b37140a2d6fef321c837c2df6fb3ee97a10e8070696` |
| `lib/publish-job.js` | `f7284fe39e5eda6e69c757b37aa3635670e5ec52120856b34fe01076a3b2af9d` | `e2a944787fec0f7202524d7b9c08f88e90ebfa11137dd56c320f64e445940d58` |
| `lib/mcp.js` | `493a68808a95c16e7229518de2be3e56a1ef867446ee8212d2eef0afb3eb6acc` | `622fe9942551209a82cbff0f2b761ced7b1ed7562d6669f3b344ec97327c72b3` |
| `lib/report-mail.js` | `a7995fa4c59539a3bcaea1fcbd17c68926013a88a23be9d10c56eb970f064e55` | `77ba2c571b2ca0887e9fa475be6bd370aa756cd8dd54a8c73cdd98d0b9e5576f` |
| `test/smtp-envelope.test.js` | 없음 | 패치에 포함 |
| `server.js` | `1812a68aec1259c6d1a7b34db6e9a46ae6848051510af76635bd0a53d0cdf8d7` | 적용 후 `sha256sum server.js` |
| `lib/channel-caption.js` | 없음 | `7beae1f61fe3af0a2c96112ab772c2a9e60ab61a73acf28921169aade57785d9` |
| `test/channel-caption.test.js` | 없음 | `3541f3f5b198806f5a0b0ea34d7a8c274ecad222addabec977dfd54ca0d3fd21` |

적용: 앱 루트에서 `patch -p1 --dry-run < channel-captions/onepost-channel-captions.patch` 후 `patch -p1`.

테스트: `node --test test/channel-caption.test.js` 3개 통과.
