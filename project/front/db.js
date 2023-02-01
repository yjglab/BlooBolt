import shortid from "shortid";

const vtlUser1 = {
  id: 101,
  email: "yjg@flashbag.live",
  nickname: "yjg",
  Posts: [],
  Tracings: [
    {
      id: shortid.generate(),
      nickname: "동키1",
    },
    {
      id: shortid.generate(),
      nickname: "동키2",
    },
    {
      id: shortid.generate(),
      nickname: "동키3",
    },
  ],
  Tracers: [
    {
      id: shortid.generate(),
      nickname: "추적자1",
    },
    {
      id: shortid.generate(),
      nickname: "추적자2",
    },
    {
      id: shortid.generate(),
      nickname: "추적자3",
    },
  ],
};
const vtlPost1 = {
  id: shortid.generate(),
  content: "가상 포스트1",
  UserId: 101,
  User: {
    id: vtlUser1.id,
    nickname: vtlUser1.nickname,
  },
  Image: [
    {
      id: shortid.generate(),
      src: "",
      PostId: vtlPost1.id,
    },
  ],
  Comments: [
    {
      id: shortid.generate(),
      content: "댓글댓글",
      UserId: vtlUser1.id,
      PostId: vtlPost1.id,
      User: {
        id: vtlUser1.id,
        nickname: vtlUser1.nickname,
      },
    },
  ],
};
