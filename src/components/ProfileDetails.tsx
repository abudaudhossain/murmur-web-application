import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface ProfileDetailsProps {
  coverImage?: string;
  avatar: string;
  name: string;
  username: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  followers: number;
  following: number;
  isCurrentUser?: boolean;
  onEditOrFollow?: () => void;
}

export default function ProfileDetails({
  coverImage,
  avatar,
  name,
  username,
  bio,
  location,
  joinDate,
  followers,
  following,
  isCurrentUser = false,
  onEditOrFollow,
}: ProfileDetailsProps) {
  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
      {/* Cover Image */}
      <Box sx={{ height: 150, backgroundColor: '#ccc' }}>
        {coverImage && (
          <Box
            component="img"
            src={coverImage}
            alt="Cover"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>

      {/* Profile Body */}
      <Box sx={{ p: 2, position: 'relative' }}>
        {/* Avatar */}
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 90,
            height: 90,
            border: '3px solid white',
            position: 'absolute',
            top: -45,
            left: 16,
          }}
        />

        {/* Action Button */}
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant={isCurrentUser ? 'outlined' : 'contained'}
            size="small"
            onClick={onEditOrFollow}
            sx={{ textTransform: 'none', borderRadius: 5 }}
          >
            {isCurrentUser ? 'Edit Profile' : 'Follow'}
          </Button>
        </Box>

        {/* Name + username */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>

          {/* Bio */}
          {bio && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              {bio}
            </Typography>
          )}

          {/* Meta Info */}
          <Stack direction="row" spacing={2} mt={1} alignItems="center">
            {location && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Stack>
            )}
            {joinDate && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarMonthIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Joined {joinDate}
                </Typography>
              </Stack>
            )}
          </Stack>

          {/* Follower Stats */}
          <Stack direction="row" spacing={2} mt={1}>
            <Typography variant="body2">
              <strong>{following}</strong> Following
            </Typography>
            <Typography variant="body2">
              <strong>{followers}</strong> Followers
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
