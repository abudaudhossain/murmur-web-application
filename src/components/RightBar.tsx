import React from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

const newUsers = [
    {
        name: 'Jane Doe',
        username: '@janedoe',
        avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
        name: 'John Smith',
        username: '@johnsmith',
        avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
        name: 'Alex Kim',
        username: '@alexkim',
        avatar: 'https://i.pravatar.cc/150?img=3',
    },
];

export default function RightBar() {
    return (
        <Box
            component="aside"
            sx={{
                flex: 1,
                maxWidth: 280,
                p: 2,
                bgcolor: '#f5f5f5',
                height: '100vh',
                position: 'sticky',
                top: 0,
                display: { xs: 'none', md: 'block' },
                borderRight: '1px solid #ddd',
            }}
        >

            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', lg: 'block' },
                    p: 2,


                }}
            >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    What’s happening
                </Typography>

                <Box>
                    <Typography variant="body2" fontWeight="bold">#React</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Trending with #NextJS
                    </Typography>
                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" fontWeight="bold">#MurmurLaunch</Typography>
                    <Typography variant="caption" color="text.secondary">
                        2,403 posts today
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    New Users
                </Typography>

                <List dense>
                    {newUsers.map((user, index) => (
                        <ListItem
                            key={index}
                            alignItems="flex-start"
                            secondaryAction={
                                <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                                    Follow
                                </Button>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={user.avatar} alt={user.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={user.username}
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/users"
                    fullWidth
                    sx={{ mt: 3, borderRadius: 8, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    See More Users
                  </Button>
            </Box>
        </Box>
    );
}
