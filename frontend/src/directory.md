## /frontend 디렉토리 구조 설계

```sh
/frontend
├─/asset
│    //이미지 파일 같은 에셋 관리
│    logo.svg
│    pochita.svg
│    (...)
├─/common
│    //자주 사용하는 공용 컴포넌트 관리
├─/page
│  │ //페이지 단위 컴포넌트 관리
│  ├─/login
│  ├─/main
│  ├─/chat
│  ├─/game
│  ├─/profile
│  └─(...)
├─/store
│    //전역 상태 관리
│    user.ts
│    (...).ts
├─/style
│    //CSS 관리
│    theme.ts
│    (...).css
├─/type
│    type.d.ts //새롭게 정의한 타입을 관리할 파일
└─/util
     //기타 상수나 유틸리티 관리
     util.ts
```
