import React, { useState } from 'react';
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  Divider,
} from '@mui/material';                // from earlier
import ProfileDetails from '../components/ProfileDetails';
import MurmurCard from '../components/Murmur/MurmurCard';

export default function Profile() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tweets = [
    {
      id: 1,
      user: {
        name: 'Abu Daud',
        username: '@abudaud',
        avatar: 'https://i.pravatar.cc/150?img=18',
      },
      content: 'Building my own Twitter clone with React + MUI 🔥',
      media: 'https://source.unsplash.com/random/600x300',
      isVideo: false,
    },
    {
      id: 2,
      user: {
        name: 'Abu Daud',
        username: '@abudaud',
        avatar: 'https://i.pravatar.cc/150?img=18',
      },
      content: 'Just added follower cards and post UI — feels amazing!',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      {/* Profile Header */}
      <ProfileDetails
        coverImage="https://source.unsplash.com/random/900x200"
        avatar="https://i.pravatar.cc/150?img=18"
        name="Abu Daud"
        username="@abudaud"
        bio="Frontend Dev | Building full-stack stuff with love 🛠️"
        location="Poland"
        joinDate="March 2024"
        followers={325}
        following={148}
        isCurrentUser={true}
        onEditOrFollow={() => console.log('Edit Profile Clicked')}
      />

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Posts" />
        <Tab label="Media" />
        <Tab label="Likes" />
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      {/* Tab Content */}
      {tab === 0 &&
        tweets.map((tweet) => (
          <MurmurCard
            key={tweet.id}
            user={tweet.user}
            content={tweet.content}
            media={tweet.media}
            isVideo={tweet.isVideo}
          />
        ))}

      {tab === 1 && (
        <Typography textAlign="center" color="text.secondary" mt={4}>
          No media posts yet.
        </Typography>
      )}

      {tab === 2 && (
        <Typography textAlign="center" color="text.secondary" mt={4}>
          You haven’t liked any posts yet.
        </Typography>
      )}
    </Container>
  );
}
