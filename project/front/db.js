import shortid from "shortid";

export function genComment(user, text) {
  const comment = {
    id: shortid.generate(),
    content: text, // 제힌 800
    createdAt: "2000.00.00",
    UserId: user.id,
    PostId: 33,
    User: {
      id: user.id,
      username: user.username,
      status: user.status,
      role: user.role,
    },
  };
  return comment;
}
export function genPost(user, text) {
  const post = {
    id: 33,
    content: text, // 제힌 800
    createdAt: "1999.99.99",
    UserId: 101,
    User: {
      id: user.id,
      username: user.username,
      status: user.status,
      role: user.role,
    },
    Image: [
      {
        id: shortid.generate(),
        src: "https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg",
        PostId: 33,
      },
    ],
    Comments: [],
    Likers: [{ id: 101 }, { id: 102 }],
  };
  return post;
}

export const vtlUser1 = {
  id: 101,
  email: "yjg@flashbag.live",
  username: "yjg",
  status: true, // add
  about: "안녕하세요", // add string (30제한)
  avatar: "", // add string src
  role: "Web Developer", // add string(18)
  country: "korea",
  website: "demo.com",
  Posts: [
    {
      id: shortid.generate(),
      createdAt: "1888.88.88",
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
      createdAt: "1777.77.77",
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
