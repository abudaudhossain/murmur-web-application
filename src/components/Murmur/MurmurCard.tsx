import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MurmurCardProps {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  media?: any;
  likes: any[]; // you can be more specific if you have user info
  isLiked: boolean;
  onLikeToggle: (postId: number, liked: boolean) => void;
}

export default function MurmurCard({
  id,
  user,
  content,
  media,
  likes = [],
  isLiked,
  onLikeToggle
}: MurmurCardProps) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3 }}>
      <CardHeader
        avatar={<Avatar src={user?.avatar} />}
        title={
          <Typography fontWeight="bold" variant="body1">
            {user?.name}
          </Typography>
        }
        subheader={
          <Typography color="text.secondary" variant="body2">
            {user?.username}
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          {content}
        </Typography>

        {media && (
          <Box
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              mt: 1,
              mb: 2,
            }}
          >
            {media?.type == "video" ? (
              <video src={`${import.meta.env.VITE_API_BASE_URL}${media.url}`} controls style={{ width: '100%' }} />
            ) : (
              <img src={`${import.meta.env.VITE_API_BASE_URL}${media.url}`} alt="media" style={{ width: '100%' }} />
            )}
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" mt={1}>
          <IconButton size="small">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => onLikeToggle(id, !isLiked)}
            sx={{ color: isLiked ? 'red' : 'inherit' }}
          >
            {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            <span style={{ marginLeft: '4px' }}>{likes.length}</span>
          </IconButton>

          <IconButton size="small">
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
