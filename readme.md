# spritesmith_mixin
spritesmith의 사용성을 높이기 위한 handlebar Template 및 sass mixin/function 설정

## 설치 및 초기 셋팅

1. `npm install` 명령어를 입력하여 기본적인 `package` 설치
2. 프로젝트 환경에 맞게 기본적인 설정이 포함된 `gulpfile.js`를 수정
3. 개별 sprite 이미지는 `img/`폴더 아래에 생성   
**(`gulpfile.js`안의 경로와 스프라이트 이미지가 저장 될 `img/` 폴더의 경로는 동일해야 함)**  
4. `img/sp/` 폴더 안에 개별 `sprite` 이미지가 있다고 가정했을 때 `gulp sprite`를 입력하면 `img/sp/` 폴더안의 개별 `png`파일들을 하나의 `sp.png`로 생성해주며,
`src/scss/_sprite/`폴더에 각각의 `sprite`의 정보가 담긴 `*.scss` 파일이 생성됨

## 기본적인 사용법

`style.scss`에서 사용하기를 원하는 경우 아래와 같이 설정 후 사용

**scss**
~~~scss
@charset "utf-8";
@import "common/spritesmith_mixin";   //spritesmith를 사용하기 위해 미리 선언해둔 함수 모음
@import "sprite/sp";                  //sprite 정보가 담긴 파일

@include sprite-init($sp);            //get-sprite() mixin 호출시 공통된 부분을 모아주는 init mixin

.test{
  @include get-sprite(ico_test, $sp)  //.png를 생략한 파일명과 폴더명을 입력 파일명은 일반 문자, 폴더명은 변수형태로 적어줘야 함
}
~~~

**css**
~~~css
@charset "utf-8";
.test{
  background-image: url("../img/sp.png");
  background-image: url("../img/sp_pc.png") \9;
  background-repeat: no-repeat;
  -webkit-background-size: 50px 50px;
  background-size: 50px 50px;
}

.test{
  display:inline-block;
  width: 50px;
  height: 50px;
  background-position: 0 0;
}
~~~
