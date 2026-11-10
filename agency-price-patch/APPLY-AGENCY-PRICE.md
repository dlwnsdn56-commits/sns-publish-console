# 영상 제작 대행 가격 문구

배포하지 않는다. 머지하지 않는다. 결제 금액과 약관 본문은 바꾸지 않는다.

이 패치는 2026-11-09에 반영된 AI 연결 안내 이후의 운영 파일에 적용한다. 주간 리포트는 포함하지 않는다. `server.js`와 `public/ether-sua.html`은 포함하지 않는다.

## 적용 전 확인

- `public/index.html` `bdebb2fc14d4b885273b933211e5a73620e2f7e65cc1d6e8841d8c558747f763`
- `public/ether.html` `2be5b43b8726aed0b1c04498bff5ed0e399d7799ef8f033b5574c74854510402`
- `public/agency.html` `0f17e20d57203481792c8800e476542882d851d80b5c37adf694c20ae23a88a7`
- `server.js`는 유지 `198e195549d94015093145598bcdd6c040d1548fdfa3c790f24729cedd331753`
- `public/ether-sua.html`은 유지 `58381e71bf91ad7dfaf3a9eb6a216271a1cc005d5e912e079d34d8c12dd7219c`

```
cd /opt/onepost/sns-publish-console
sha256sum public/index.html public/ether.html public/agency.html server.js public/ether-sua.html
patch --dry-run -p1 < onepost-agency-price.patch
```

해시가 다르면 적용하지 않는다. 새 패키지, 환경 변수, 결제 금액 변경은 없다.

## 롤백

`patch -R -p1 < onepost-agency-price.patch`

남은 `test/agency-price.test.js`는 지우면 된다. `server.js`와 수아 페이지는 롤백 대상이 아니다.
