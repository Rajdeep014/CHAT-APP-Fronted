import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { server } from "../../components/constants/config";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutCharts, LineCharts } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/dashboard`,
    "dashboard-stats"
  );
  const { stats } = data || {};

  // const user = data.stats.usersCount;
  // const chats = data.stats.groupsCount;
  // const messages = data.stats.messageCount;
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction="row" alignItems="center" spacing="1rem">
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="Search" />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{ xs: "none", lg: "block" }}
          color="rgba(0,0,0,0.7)"
          textAlign="center"
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent={{ xs: "center", sm: "space-between" }}
      alignItems="center"
      margin="2rem 0"
    >
      <Widget
        title="Users"
        value={stats?.usersCount || " 43"}
        Icon={<PersonIcon />}
      />
      <Widget
        title="Chats"
        value={stats?.groupsCount || "00"}
        Icon={<GroupIcon />}
      />
      <Widget
        title="Messages"
        value={stats?.messageCount || "00"}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  return loading ? (
    <Skeleton />
  ) : (
    <AdminLayout>
      <Container component="main">
        {Appbar}

        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }} // Make the charts side by side on large screens, column on small screens
          justifyContent="space-between" // Ensure space between the two charts
          alignItems="stretch" // Align vertically when side by side
          sx={{ gap: "2rem", margin: "2rem 0" }}
        >
          <ChartContainer fullWidth>
            <Typography margin="2rem 0" variant="h4">
              Last Messages
            </Typography>
            <LineCharts value={stats?.messages || []} />
          </ChartContainer>

          <ChartContainer small>
            <DoughnutCharts
              labels={["Single Chats", "Group Chats"]}
              value={[
                stats?.totalChatCount - stats?.groupsCount || 0,
                stats?.groupsCount || 0,
              ]}
            />
            <OverlayIcons />
          </ChartContainer>
        </Box>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

// Widget Component
const Widget = ({ title, value, Icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems="center" spacing="1rem">
      <Typography
        sx={{
          color: "rgba(0,0,0,0.9)",
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction="row" spacing="1rem" alignItems="center">
        {Icon}
        <Typography variant="h6">{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

// ChartContainer component for consistent layout
const ChartContainer = ({ children, fullWidth = false, small = false }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      borderRadius: "1rem",
      width: fullWidth ? "100%" : small ? "25rem" : "45rem", // Responsive width handling
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      flexGrow: fullWidth ? 1 : 0, // Ensure the charts grow when side by side
    }}
  >
    {children}
  </Paper>
);

// OverlayIcons Component for Doughnut chart
const OverlayIcons = () => (
  <Stack
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      direction: "row",
      justifyContent: "center",
      alignItems: "center",
      spacing: "0.5rem",
    }}
  >
    <GroupIcon />
    <Typography>Vs</Typography>
    <PersonIcon />
  </Stack>
);

export default Dashboard;
