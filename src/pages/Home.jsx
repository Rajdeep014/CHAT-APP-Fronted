import React from 'react'
import AppLayout from '../components/layout/AppLayout';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={"gray"}>
    <Typography variant={"h5"} padding={"2rem"} textAlign={"center"} >
      Select a friend to chat
    </Typography>

    </Box>
  )
}

export default AppLayout()(Home);