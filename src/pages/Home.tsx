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
import Timeline from '../components/Timeline';


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

                <Timeline />
            </Box>
        </Box>
    );
}
