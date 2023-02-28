# BlooBolt

BlooBolt Square는 소프트웨어 개발자와 디자인 직무자들의 소통 광장입니다.

<div align=center> 
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Redux--Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Nextjs-000000?style=for-the-badge&logo=Nextjs&logoColor=white">
<img src="https://img.shields.io/badge/Tailwindcss-764ABC?style=for-the-badge&logo=Tailwindcss&logoColor=black">
</div>

<div align=center> 
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/AWS--Lambda-FF9900?style=for-the-badge&logo=Sequelize&logoColor=white">
</div>

[front]

- React, redux(toolkit), Next, Tailwind
- 4040

[back]

- Express, Sequelize
- 4080

[Out]

- AWS

## BlooBolt V.Beta

#### `회원등록과 로그인`

- 회원가입에는 이메일, 사용자명, 비밀번호, 직군 정보를 받으며 이메일은 인증 절차를 시도하여 해당 이메일로 코드를 전송하고 코드가 일치하면 가입을 승인함.

#### `스퀘어 관련 기능`

- 스퀘어는 일종의 대화 공간으로써 퍼블릭, 프론트엔드, 백엔드, 디자인 총 4개의 스퀘어가 존재함.
- 모든 스퀘어에 들어가서 포스트를 보거나 코멘트를 업로드할 수 있으나 포스트 업로드는 퍼블릭과 자신의 스퀘어에서로 제한됨.
- 모든 포스트는 어떤 스퀘어에서 업로드하느냐에 따라 고윳값을 가지며 각 스퀘어별로 불러오는 포스트가 달라짐.
- 스퀘어 로드는 첫 페이지 로드 시 한번에 12개의 포스트만을 불러오며 스크롤을 내리면 12개씩 추가로 로드함.

#### `사용자 프로필 관련 기능`

- 프로필에는 사용자 아바타 이미지, 사용자 활동 내역과 사용자 공개 정보, 개인 정보가 존재함.
- 사용자 활동 내역에는 업로드한 포스트, 트레이스 리스트가 표시됨.
- 공개 정보는 프로필 배너에 표시되며 다른 사람이 볼 수 있음. 공개 정보 중 사용자 클래스 외의 내용은 변경이 가능함.
- 비공개 정보는 로그인 사용자 이외의 사용자가 볼 수 없음. 비공개 정보 중 이메일ID는 변경할 수 없으며 비밀번호는 별도의 페이지에서 사용자 확인 절차를 통해 변경이 가능함.
- 비밀번호 변경은 별도의 페이지에서 관리하며 해당 페이지에서 변경이 가능함.
- 1.0 에서 추가할 내용: 옵션을 제공하여 공개 정보도 비공개 처리

#### `사용자 직군(클래스)`

- 회원가입시 선택했던 직군에 따라 포스트 상단에 보여지는 아바타 링의 색상이 다르게 표시됨. 해당 포스트가 어떤 직군의 사용자가 업로드한 것인지를 쉽게 알아볼 수 있게 하기위한 기능.

#### `포스트 관련 기능`

[토픽]

- 토픽과 포스트 분류, 콘텐츠, 이미지를 업로드 가능. 토픽은 빈칸으로 제출 가능하며 빈칸이면 '토픽 없음'으로 표시됨.

[해시태그]

- 콘텐츠에 해시 태그를 등록할 수 있으며 클릭하면 해당 해시태그만 있는 포스트가 로드됨.

[프롯]

- 프롯(==포스트 추천 기능), 포스트 업로더에 대한 트레이스(==팔로우) 등록 기능 제공. 자신의 포스트에 대한 프롯 기능은 금지됨.

[수정]

- 토픽과 콘텐츠, 이미지, 분류 수정 가능. 수정된 포스트는 포스트 앞면에 수정된 글임을 표시함.

[삭제와 블라인드]

- 삭제 기능은 무분별한 업로드+삭제 예방을 위해 신중히 사용하는 옵션. 삭제 수행 시 확인 절차를 알리고 확인 시
  코멘트가 없는 포스트는 완전삭제가 가능하지만 코멘트가 있는 포스트의 경우 영구 삭제가 아닌 블라인드 처리. 블라인드 된 포스트는 복원이 가능하며 프롯, 댓글 기능은 복원되지만 수정 기능은 금지됨.
- 블라인드 된 포스트는 프롯, 댓글, 수정 기능이 금지됨. (정 내용을 가리고 싶다면 삭제하기 전 수정을 해야할 것)
- 블라인드 된 포스트는 타인에 의해 열람될 수 있으나 Rank 6인 사용자부터 가능함.

[신고]

- 포스트 신고는 작성자에 대한 신고로 간주함. 신고 요청시 신고 내용과 포스트 정보, 신고자 정보가 저장됨.
- 포스트 혹은 사용자가 7회 누적 신고를 받으면 해당 사용자의 모든 포스트가 블라인드되며 14회 누적 신고를 받으면 해당 사용자의 서비스 이용이 제한됨.
- 한 계정당 한번 신고한 다른 사용자는 다시 신고할 수 없음.

[검색]

- 키워드로 포스트 토픽 또는 내용과 일치하는 포스트를 찾아 결과를 불러옴.
- 블라인드된 포스트는 검색에서 제외함.

#### `랭크 관련 기능`

- Rank는 6~1이 존재하며 사용자의 참여도 수치를 의미함. Rank 9는 관리자를 의미.
- Rank의 초기 상태는 null이며 포스트 한 개를 작성하면 Rank 6으로 상승함.
- 포스트, 코멘트를 올릴 경우 10p, 프롯을 받거나 트레이스 요청을 받은 경우 100p가 부여됨. 포스트, 코멘트를 삭제하거나 프롯 취소, 트레이스 연결이 해제되면 받은 포인트가 회수됨. 코멘트를 올린 포스트가 자신의 포스트인 경우 포인트가 증가되지 않음.

#### `Live Activation 관련 기능(준비중)`

<!-- - stack; useInterval -->

## 고안중인 리스트.

- rank 5: 1000, 4: 5000, 3: 10000, 2: 100000, 1: 1000000
- 사용자생성일
- scrap 기능
- 비밀번호찾기, 변경하기
- 아바타 삭제
- 의견보내기

- pending 다시 넣기
- 트레이서 차단, 트레이스된 포스트만
- 포스트폼 여백
- 조회수
- 핫글
- 회원 탈퇴

## 수정할거

- 아바타 없으면 기본 이미지 설정. (aws)

## 구현 예정 기능.

-

### 알게된

- delete, get은 data를 못보냄. 쿼리로 보내야.

### 스택 변경사항

- redux 비동기액션 미들웨어 : Saga->RTK. (saga가 익숙하지만 코드가 짧아서 더 좋을듯)

### 문제

-

### 기록

- reducers는 단순히 동기적으로 자기자신의 state를 바꾸는 action들.
  extraReducers는 외부로부터 state가 바뀌는 경우를 처리하기 위함. login이나 logout 등은 createAsyncThunk를 통해 만든 액션. userSlice에서 이렇게 외부에서 생성한 createAsyncThunk같은 것을 대응하려면 extraReducers에 등록해야함. 비슷한 이유로 다른 슬라이스의 액션에서 내 슬라이스의 state를 바꾸려고 한다면 extraReducers에서 다른 슬라이스의 액션을 등록해야함. (RTK 2에서 변경예정이라함)
