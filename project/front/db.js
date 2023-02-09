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
      rank: 2,
    },
  };
  return comment;
}
export function genPost(user, text) {
  const post = {
    id: 33,
    content: text, // 제힌 800
    topic: "Java", // 제한 10
    createdAt: "1999.99.99",
    UserId: 101,
    User: {
      id: user.id,
      username: user.username,
      status: user.status,
      role: user.role,
      rank: user.rank,
    },
    Images: [
      {
        id: shortid.generate(),
        src: "https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg",
        PostId: 33,
      },
      {
        id: shortid.generate(),
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3uzoXR-8RW329LQPSX7rTIVvRu2jjAAjRaaeHrcNq6SJumXGf76Lindigou1vDETv5yJY&usqp=CAU",
        PostId: 33,
      },
      {
        id: shortid.generate(),
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIyMWFCp45hPeakHrpSmOZATi_Gd1FkYZQA&usqp=CAU",
        PostId: 33,
      },
      {
        id: shortid.generate(),
        src: "https://cdn.shopify.com/s/files/1/1759/2157/products/0L7A4217_720x@2x.JPG?v=1530530879",
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
  email: "yjg@bloobolt.live",
  username: "yjg",
  realname: "realyjg",
  status: true, // add
  about: "안녕하세요", // add string (30제한)
  avatar: "", // add string src
  role: "Web Developer", // add string(18)
  country: "Korea",
  website: "demo.com",
  rank: 5, // 1 ~ 5, 기본 null, 어드민 9
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
      Images: [
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
            rank: 2,
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
      Images: [
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
      role: "동키1의 역할",
      rank: 2,
    },
    {
      id: shortid.generate(),
      username: "동키2",
      role: "동키1의 역할",
      rank: 2,
    },
    {
      id: shortid.generate(),
      username: "동키3",
      role: "동키1의 역할",
      rank: 2,
    },
  ],
  Tracers: [
    {
      id: shortid.generate(),
      username: "추적자1",
      role: "추적자1의 역할",
      rank: 4,
    },
    {
      id: shortid.generate(),
      username: "추적자2",
      role: "추적자1의 역할",
      rank: 4,
    },
    {
      id: shortid.generate(),
      username: "추적자3",
      role: "추적자1의 역할",
      rank: 4,
    },
  ],
};
