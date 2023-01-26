## /frontend 디렉토리 구조 설계

```sh
/frontend
├─/asset
│    //이미지 파일 같은 에셋 관리
│    logo.svg
│    pochita.svg
│    (...)
├─/hook
│    //커스텀 hook 관리
├─/common
│    //자주 사용하는 공용 컴포넌트 관리
│    //컴포넌트 분리하는 이유는...? -> 다른 공용 엣셋/훅/을 넣을 경우 분리하기도함
├─/page
│  │ //페이지 단위 컴포넌트 관리
│  ├─/Login
│  ├─/Main
│  ├─/Chat
│  ├─/Game
│  ├─/Profile
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

- index.ts 넣어서 파일 구조 다 올리기

* 컨벤션 해야할 것
* 컴포넌트/페이지 이름을
  - 이름 시작을 대문자로
* 변수
  - 소문자로 시작
