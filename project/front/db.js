import shortid from "shortid";

export function gernerateVtlPost(vtlUser) {
  const post = {
    id: 33,
    content: "가상 포스트1",
    createdAt: "1999.99.99",
    UserId: 101,
    User: {
      id: vtlUser.id,
      username: vtlUser.username,
    },
    Image: [
      {
        id: shortid.generate(),
        src: "https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg",
        PostId: 33,
      },
    ],
    Comments: [
      // gernerate로
      {
        id: shortid.generate(),
        content: "댓글댓글",
        createdAt: "2000.00.00",
        UserId: vtlUser.id,
        PostId: 33,
        User: {
          id: vtlUser.id,
          username: vtlUser.username,
        },
      },
    ],
    Likers: [{ id: 101 }],
  };
  return post;
}

export const vtlUser1 = {
  id: 101,
  email: "yjg@flashbag.live",
  username: "yjg",
  status: true, // add
  greeting: "안녕하세요", // add string (30제한)
  avatar: "", // add string src
  Posts: [
    {
      id: shortid.generate(),
      content: "가상 포스트1",
      UserId: 101,
      User: {
        id: 101,
        username: "yjg",
      },
      Image: [
        {
          id: shortid.generate(),
          src: "",
          PostId: shortid.generate(),
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          content: "댓글댓글",
          UserId: 76,
          PostId: shortid.generate(),
          User: {
            id: 76,
            username: "댓글러",
          },
        },
      ],
    },
    {
      id: shortid.generate(),
      content: "가상 포스트1",
      UserId: 101,
      User: {
        id: 101,
        username: "yjg",
      },
      Image: [
        {
          id: shortid.generate(),
          src: "",
          PostId: shortid.generate(),
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          content: "댓글댓글",
          UserId: 76,
          PostId: shortid.generate(),
          User: {
            id: 76,
            username: "댓글러",
          },
        },
      ],
    },
  ],
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
