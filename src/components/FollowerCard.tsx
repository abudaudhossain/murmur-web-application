import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Stack,
  Dialog, DialogTitle, DialogContent
} from '@mui/material';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import UserMurmur from './UserMurmur';

interface FollowerCardProps {
  id: number,
  followersCount: number,
  followingCount: number,
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  isFollowing?: boolean;
}

export default function FollowerCard({
  id,
  name,
  username,
  avatar,
  bio,
  isFollowing = false,
  followingCount,
  followersCount
}: FollowerCardProps) {
  const [openDetails, setOpenDetails] = React.useState(false);
  const [isFollow, setIsFollow] = useState(isFollowing)
  const onFollowToggle = (id) => {
    // Handle follow/unfollow logic here
    console.log(isFollowing ? handleUnFollow(id) : handleFollow(id));
    setIsFollow(!isFollow)
  };

  const { user } = useStore();
  const handleFollow = async (targetUserId: number) => {
    try {
      await clientSideAxios.post(`/follow/${targetUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        }
      });

    } catch (err) {
      console.error("Follow failed:", err);
    }
  };
  const handleUnFollow = async (targetUserId: number) => {
    try {
      await clientSideAxios.delete(`/follow/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        }
      });

    } catch (err) {
      console.error("Follow failed:", err);
    }
  };
  return (
    <>
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
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenDetails(true)}
              variant="subtitle1"
              fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {username}
            </Typography>

            <Typography variant="body2" sx={{ mt: 0.5 }} color="text.secondary">
              <span>follower: {followersCount}  </span>
              <span>following: {followingCount}  </span>
            </Typography>

          </Box>

          <Button
            variant={isFollow ? 'outlined' : 'contained'}
            size="small"
            onClick={() => onFollowToggle(id)}
            sx={{ textTransform: 'none', minWidth: 90, mt: 0.5 }}
          >
            {isFollow ? 'Following' : 'Follow'}
          </Button>
        </Stack>
      </Paper>
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
        {/* <DialogTitle>User Details</DialogTitle> */}
        <DialogContent >
          <ProfileDetails
            coverImage=""
            avatar="https://i.pravatar.cc/150?img=18"
            name={name || ""}
            username={username}
            bio={'user bio'}
            location="Poland"
            joinDate="March 2024"
            followers={followersCount}
            following={followingCount}
            isFollowing={isFollow}
            isCurrentUser={false}
            onEditOrFollow={() => onFollowToggle(id)}
          />
          <UserMurmur id={id} />
        </DialogContent>
      </Dialog>

    </>
  );
}
