import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

export default function CreatePostForm() {
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    // handle your post logic (send content and file to API)
    console.log({ content, mediaFile });
    setContent('');
    setMediaFile(null);
    setMediaPreview(null);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar src="https://i.pravatar.cc/150?img=11" />
          <Box flex={1}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="What’s happening?"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {mediaPreview && (
              <Box mt={2}>
                {mediaFile?.type.startsWith('video') ? (
                  <video
                    src={mediaPreview}
                    controls
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                ) : (
                  <img
                    src={mediaPreview}
                    alt="preview"
                    style={{ maxWidth: '100%', borderRadius: 8 }}
                  />
                )}
              </Box>
            )}

            <Stack direction="row" spacing={2} mt={2} alignItems="center">
              <Button
                variant="text"
                component="label"
                startIcon={<ImageIcon />}
              >
                Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleMediaUpload}
                />
              </Button>

              <Button
                variant="text"
                component="label"
                startIcon={<VideoLibraryIcon />}
              >
                Video
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleMediaUpload}
                />
              </Button>

              <Box flexGrow={1} />

              <Button
                variant="contained"
                disabled={!content && !mediaFile}
                onClick={handlePost}
                sx={{ borderRadius: 5, textTransform: 'none', px: 3 }}
              >
                Post
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
