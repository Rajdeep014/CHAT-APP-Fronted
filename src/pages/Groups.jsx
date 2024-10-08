import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceBtn,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/StyledComponents";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteGroupMutation,
  useMyGroupsQuery,
  useRemoveMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialog/AddMemberDialog")
);

const Groups = () => {
  const dispatch = useDispatch();

  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const myGroups = useMyGroupsQuery();
  const { isAddMember } = useSelector((state) => state.misc);

  const ChatDetails = useChatDetailsQuery(
    { chatId, populate: true },
    {
      skip: !chatId,
    }
  );
  const [updateGroup, isloadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveMemberMutation
  );
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteGroupMutation
  );

  // console.log("chat details", ChatDetails?.data);
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: ChatDetails.isError,
      error: ChatDetails.error,
    },
  ];

  useErrors(errors);
  useEffect(() => {
    if (ChatDetails.data) {
      setGroupName(ChatDetails?.data?.chat?.name);
      setGroupNameUpdatedValue(ChatDetails?.data?.chat?.name);
      setMembers(ChatDetails?.data?.chat?.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [ChatDetails.data]);
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const navigateBack = () => {
    navigate("/ ");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    updateGroup("Successfull renamed", { chatId, name: groupNameUpdatedValue });
    setIsEdit(false);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
    console.log("member");
  };

  const deleteHandler = () => {
    deleteGroup("Successfull deleted", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups ");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Successfull removed", { chatId, userId });
  };
  const IconBtn = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(50, 50, 50, 0.8)",
            color: "white",
            ":hover": { bgcolor: "rgba(50, 50, 50, 0.7)" },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceBtn />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            placeholder="Enter Group Name"
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} diisbled={isloadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5" color="text.primary">
            {groupName}
          </Typography>
          <IconButton
            disabled={isloadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ sm: "row", xs: "column-reverse" }}
      spacing={"1rem"}
      p={{ sm: "1rem", sx: "0", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={openConfirmDeleteHandler}
        sx={{ color: "red", borderColor: "red" }}
      >
        Delete Group
      </Button>
      <Button
        variant="contained"
        size="large"
        startIcon={<DeleteIcon />}
        onClick={openAddMemberHandler}
        sx={{
          bgcolor: "#007bff",
          ":hover": { bgcolor: "#0056b3" },
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <>
      <Stack height="100vh" direction="row">
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: "25%",
            bgcolor: "#f4f4f4",
            height: "100%",
          }}
        >
          <GroupList myGroups={myGroups?.data?.chats} chatId={chatId} />
        </Box>

        <Stack
          flexGrow={1}
          padding={"1rem 3rem"}
          alignItems="center"
          position="relative"
        >
          {IconBtn}
          {groupName && (
            <>
              {GroupName}
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
                color="text.secondary"
              >
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                padding={{ sm: "1rem", sx: "0", md: "1rem 4rem" }}
                spacing={"2rem"}
                bgcolor={"#f9f9f9"}
                height={"50vh"}
                overflow={"auto"}
              >
                {isLoadingDeleteGroup ? (
                  <CircularProgress />
                ) : (
                  members.map((i) => (
                    <UserItem
                      key={i._id}
                      user={i}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
                        padding: "1rem 2rem",
                        borderRadius: "0.5rem",
                        bgcolor: "white",
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                )}
              </Stack>
              {ButtonGroup}
            </>
          )}
        </Stack>

        <Drawer
          sx={{ display: { xs: "block", sm: "none" } }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          <GroupList
            w={"50vw"}
            myGroups={myGroups?.data?.chats}
            chatId={chatId}
          />
        </Drawer>
      </Stack>

      {isAddMember && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
    </>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No group
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
