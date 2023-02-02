import shortid from "shortid";

export const vtlUser1 = {
  id: 101,
  email: "yjg@flashbag.live",
  username: "yjg",
  Posts: [],
  Tracings: [
    {
      id: shortid.generate(),
      username: "동키1",
    },
    {
      id: shortid.generate(),
      username: "동키2",
    },
    {
      id: shortid.generate(),
      username: "동키3",
    },
  ],
  Tracers: [
    {
      id: shortid.generate(),
      username: "추적자1",
    },
    {
      id: shortid.generate(),
      username: "추적자2",
    },
    {
      id: shortid.generate(),
      username: "추적자3",
    },
  ],
};
export const vtlPost1 = {
  id: 33,
  content: "가상 포스트1",
  UserId: 101,
  User: {
    id: vtlUser1.id,
    username: vtlUser1.username,
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
        username: vtlUser1.username,
      },
    },
  ],
};
