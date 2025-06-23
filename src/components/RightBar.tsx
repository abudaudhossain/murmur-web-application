import React, { useEffect, useState } from 'react';
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
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios'; // Adjust the import if needed
import { useStore } from '../context/StoreContext';

export default function RightBar() {
    const [newUsers, setNewUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useStore();

    useEffect(() => {
        const fetchNewUsers = async () => {
            try {
                const res = await clientSideAxios.get('follow/suggest?page=10&limit=5', {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }); // your endpoint
                console.log(res.data)
                setNewUsers(res.data.data);
            } catch (err) {
                console.error("Failed to fetch new users", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewUsers();
    }, []);

    const handleFollow = async (targetUserId: number) => {
        try {
            await clientSideAxios.post(`/follow/${targetUserId}`, {}, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                }
            });
            setNewUsers(prev => prev.filter(u => u.id !== targetUserId)); // remove after follow (optional)
        } catch (err) {
            console.error("Follow failed:", err);
        }
    };

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

                {loading ? (
                    <Box textAlign="center" my={2}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <List dense>
                        {newUsers.map((user, index) => (
                            <ListItem
                                key={user.id}
                                alignItems="flex-start"
                                secondaryAction={
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleFollow(user.id)}
                                    >
                                        Follow
                                    </Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={user.avatar} alt={user.name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={`@${user.name.toLowerCase().replace(/\s+/g, '')}`}
                                    
                                />
                            </ListItem>
                        ))}
                    </List>
                )}

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
