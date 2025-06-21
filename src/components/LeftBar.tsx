import React from 'react'
import { Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const LeftBar = () => {
    return (

       <Box
  component="aside"
  sx={{
    flex: 1,
    maxWidth: 240,
    p: 2,
    bgcolor: '#f5f5f5',
    height: '100vh',
    position: 'sticky',
    top: 0,
    display: { xs: 'none', md: 'block' },
    borderRight: '1px solid #ddd',
  }}
>
  <nav>
    <List>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      {/* <ListItemButton component={Link} to="/feed">
        <ListItemIcon>
          <RssFeedIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
      </ListItemButton> */}

      <ListItemButton component={Link} to="/murmur/me">
        <ListItemIcon>
          <ChatBubbleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Murmur" />
      </ListItemButton>

      <Divider sx={{ my: 2 }} />

      <ListItemButton component={Link} to="/followers">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Followers" />
      </ListItemButton>

      <ListItemButton component={Link} to="/following">
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Following" />
      </ListItemButton>
    </List>
  </nav>

  <Button
    variant="contained"
    color="primary"
    component={Link}
    to="/"
    fullWidth
    sx={{ mt: 3, borderRadius: 8, textTransform: 'none', fontWeight: 'bold' }}
  >
    Post Murmur
  </Button>
</Box>
    )
}

export default LeftBar