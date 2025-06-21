import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Divider,
} from '@mui/material';
import CreatePostForm from '../components/Murmur/CreatePostFrom';
import MurmurCard from '../components/Murmur/MurmurCard';

const samplePosts = [
    {
        id: 1,
        user: 'Jane Doe',
        username: '@janedoe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Excited to join Murmur! Looking forward to connecting. 🚀',
    },
    {
        id: 2,
        user: 'John Smith',
        username: '@johnsmith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Just published my first Murmur feed update. Let’s gooo! 🔥',
    },
];

export default function Home() {
    return (
        <Box display="flex">
            {/* Left sidebar (already built in your layout) */}

            {/* Main Feed Area */}
            <Box
                component="main"
                sx={{
                    flex: 2,
                    maxWidth: '600px',
                    mx: 'auto',
                    py: 4,
                    px: 2,
                    minHeight: '100vh',
                }}
            >

                <Box>
                    <CreatePostForm />
                </Box>

                {samplePosts.map((post) => (
                    <MurmurCard
                        user={{
                            name: 'Jane Doe',
                            username: '@janedoe',
                            avatar: 'https://i.pravatar.cc/150?img=12',
                        }}
                        content={post.content}
                        media="https://source.unsplash.com/random/600x300"
                        isVideo={false}
                    />

                ))}
            </Box>
        </Box>
    );
}
