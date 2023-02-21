# BlooBolt

### front

- React, redux(toolkit), Next, Tailwind
- 4040

### back

- Express, Sequelize
- 4080

### Out

- AWS

### 고안중인 리스트.

- 라이브액티베이션
- 디자인시스템.
- 해시태그, 포스트내용, 포스트제목 검색기능.
- 최근추가된트레이서.
- rank 5: 3000, 4: 10000, 3: 50000, 2: 100000, 1: 1000000
- 사용자생성일
- scrap 기능
- 비밀번호찾기, 변경하기
- modal
- status는 전역 액션으로 실행해야 할듯

### 수정할거

- 모바일화면 포스트 크기 조절.
- notice model 구분하기.
- 아바타 없으면 기본 이미지 설정.
- rankpoint front 반영.
- 로드 유저 액션 만들고 front에 별도로 넣어준 상태들 정리.

### 구현 예정 기능.

- 첫 글을 달성하면 주니어 랭크 제공.
- Rank는 RankPoint를 통해 일정 수치를 달성하면 자동으로 Rank가 상승함.
- user guide
- Report에는 user rpt 단일만 존재.
- post, comment, user page 에서 접근 가능
- 7회 누적 report => 포스트 자동 블라인드, 14회 누적 report => 해당 사용자의 모든 포스트 영구 삭제 및 서비스 이용이 금지됨.
- 포스트 삭제시 경고를 넣어햐 할듯

### 현재까지 구현 완료된 기능.

`정보 로드 관련 기능`

- 로딩중 전역 ui 표시.
- 콘텐츠에 해시태그가 존재하면 클릭시 해당 해시태그가 들어있는 포스트만 로드함.

`페이지 관련 기능`

`사용자 프로필 관련 기능`

`포스트 관련 기능`

- 토픽과 콘텐츠, 이미지를 업로드 가능. 토픽은 빈칸으로 제출 가능하며 빈칸이면 '토픽 없음'으로 표시됨.
- 콘텐츠에 해시 태그를 등록할 수 있음.
- 프롯(==포스트 추천 기능), 포스트 업로더에 대한 트레이스(==팔로우) 등록 기능 제공. 자신의 포스트에 대한 프롯 기능은 금지됨.
- 수정 기능은 토픽과 콘텐츠, 이미지 수정 모두 가능. 수정된 포스트는 포스트 앞면에 수정된 글임을 표시함.
- 삭제 기능은 무분별한 업로드+삭제 예방을 위해 신중히 결정할 기능. 삭제 수행 시 영구 삭제가 아닌 블라인드 처리. 취소 가능하며 취소 => 복원됨.
- 블라인드 된 포스트의 프롯, 댓글, 수정 기능이 금지됨. (만약 내용을 가리고 싶다면 삭제하기 전 수정을 할 것)
- 복원된 포스트의 프롯, 댓글 기능은 복원되지만 수정 기능은 금지됨.

`BlooRank 시스템 관련 기능`

- Rank는 5~1이 존재하며 사용자의 노력 수치를 의미함. Rank 9는 관리자를 의미.
- 포스트, 코멘트를 올릴 경우 10p, 프롯을 받거나 트레이스 요청을 받은 경우 100p가 부여됨. 포스트, 코멘트를 삭제하거나 프롯 취소, 트레이스 연결이 해제되면 받은 포인트가 회수됨. 코멘트를 올린 포스트가 자신의 포스트인 경우 포인트가 증가되지 않음.

`Report 관련 기능`

`Live Activation 관련 기능`

- stack; useInterval

### 알게된

- delete은 data를 못보냄. 쿼리로 보내야.

### 기술적 변경사항

- redux 비동기액션 미들웨어 변경 : Saga 걷어내고 toolkit 적용. (saga가 익숙하지만 코드가 짧아서 더 좋을듯)

### 기술적 문제

- ALTER TABLE 명 CHANGE 반복현상
