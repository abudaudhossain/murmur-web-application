import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';

interface FollowerCardProps {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  isFollowing?: boolean;
}

export default function FollowerCard({
  name,
  username,
  avatar,
  bio,
  isFollowing = false,
}: FollowerCardProps) {
    const onFollowToggle = () => {
        // Handle follow/unfollow logic here
        console.log(`${isFollowing ? 'Unfollow' : 'Follow'} ${username}`);
    };
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
        border: '1px solid #e0e0e0',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar src={avatar} alt={name} sx={{ width: 50, height: 50 }} />

        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
          {bio && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {bio}
            </Typography>
          )}
        </Box>

        <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          size="small"
          onClick={onFollowToggle}
          sx={{ textTransform: 'none', minWidth: 90, mt: 0.5 }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Stack>
    </Paper>
  );
}
