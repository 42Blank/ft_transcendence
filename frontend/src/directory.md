## /frontend 디렉토리 구조 설계

```sh
/frontend
   ├─/public
   │      index.html
   └─/src
     ├─/asset
     │    //이미지 파일 같은 에셋 관리
     │    logo.svg
     │    pochita.svg
     │    (...)
     ├─/hook
     │    //커스텀 hook 관리
     ├─/common
     │    //자주 사용하는 공용 컴포넌트 관리
     ├─/page
     │  │ //페이지 단위 컴포넌트 관리
     │  ├─/LoginPage
     │  ├─/MainPage
     │  ├─/ChatPage
     │  ├─/GamePage
     │  ├─/ProfilePage
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
