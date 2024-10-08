import { Stack } from "@mui/material";
import React from "react";
import ChatItems from "../shared/ChatItems";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        // Find new message alert for the chat
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        // Check if any of the members are online
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <ChatItems
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
