export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Raj",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Taniya",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Raj",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Taniya",
    _id: "2",
  },
];
export const sampleNotification = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "RAJ",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Taniya",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],

    content: "awf  fafawf f aw af aw f",
    _id: "dddddddddd",
    sender: {
      _id: "user._id",
      name: "gafwd",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.6302",
  },
  {
    attachments: [
      {
        public_id: "asad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],

    content: "",
    _id: "dddddddddd 2",
    sender: {
      _id: "dawdwa",
      name: "gafwd 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.6302",
  },
];

export const dashboardData = {
  users: [
    {
      name: "Raj",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "RajDeep",
      friends: 20,
      groups: 5,
    },
    {
      name: "Taniya",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "Taniya Raj",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      name: "Raj Ka Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Raj",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Taniya Ka Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Raj",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "meri girlfriend hai taniya",
      _id: "sdawafawfaf",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Raj",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.6302",
    },
    {
      attachments: [
        {
          public_id: "rajdep",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "meri girlfriend hai taniya",
      _id: "sdawafawdwfaf",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Taniya",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.6302",
    },
  ],
};
