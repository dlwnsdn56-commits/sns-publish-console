# 에테르 홈 달고맵고 섹션 — 미리보기 패치

이 패치는 배포하지 않는다. 머지하지 않는다. 주간 리포트 패치와 섞지 않는다.

적용 대상은 2026-11-06 내보내기의 `public/ether.html`이다. 그 파일 SHA-256은 `bceaad77ed7923cb514a777786c81ad3ea4d1b6f5cc70f00cd6e2d80bd8c552f`이고, 같은 시각의 라이브 `/opt/onepost/sns-publish-console/public/ether.html`과 같다. GitHub `master`의 스켈레톤에는 이 페이지가 없다. 스켈레톤으로 덮어쓰지 않는다.

## 바뀌는 파일

- `public/ether.html`
- `test/ether-dalgomaebgo.test.js` (새 파일)

서버, 인증, 분석, 수아 상세(`public/ether-sua.html`), 주간 리포트는 이 패치에 없다.

## 적용 확인만 할 때

운영 트리에서 `public/ether.html` 해시가 위 값과 같을 때만:

```
cd /opt/onepost/sns-publish-console
sha256sum public/ether.html
patch --dry-run -p1 < onepost-ether-dalgomaebgo.patch
```

해시가 다르면 적용하지 말고 현재 파일을 다시 받는다. 이 문서는 적용을 승인하지 않는다.
