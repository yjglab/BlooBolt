import shortid from "shortid";

export const vtlUser1 = {
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
export const vtlPost1 = {
  id: 33,
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
      PostId: 33,
    },
  ],
  Comments: [
    {
      id: shortid.generate(),
      content: "댓글댓글",
      UserId: vtlUser1.id,
      PostId: 33,
      User: {
        id: vtlUser1.id,
        nickname: vtlUser1.nickname,
      },
    },
  ],
};
