import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import { lightBlue } from "../constants/colors";
import RenderAttachment from "./RenderAttachment";

const MessageComponents = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <Box
      sx={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#e0f7fa" : "white",
        color: (theme) => theme.palette.text.primary,
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
        maxWidth: {
          xs: "90%", // Mobile
          sm: "80%", // Tablet
          md: "70%", // Larger screens
        },
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender?.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        {timeAgo}
      </Typography>
    </Box>
  );
};

export default memo(MessageComponents);
