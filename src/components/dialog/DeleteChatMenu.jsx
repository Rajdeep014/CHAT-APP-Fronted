import { Menu, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { setIsDeleteMenu } from "../../redux/reducers/misc";

const DeleteChatMenu = ({ dispatch, deleteOptionsAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteGroupMutation
  );
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );
  const isGroup = selectedDeleteChat.groupChat;
  // console.log(selectedDeleteChat);
  const navigate = useNavigate();
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteOptionsAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("leaving.........", selectedDeleteChat.chatId);
  };
  const DeleteChatHandler = () => {
    closeHandler();
    deleteChat("delete.........", selectedDeleteChat.chatId);
  };
  useEffect(() => {
    if (deleteChatData || leaveGroupData) {
      navigate("/");
    }
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      anchorEl={deleteOptionsAnchor.current}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      onClose={closeHandler}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : DeleteChatHandler}
      >
        {isGroup ? <> Leave Group</> : <>DeleteChat</>}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
