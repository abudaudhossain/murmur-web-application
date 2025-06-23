import React, { useEffect, useState } from 'react';
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
import { useStore } from '../context/StoreContext';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import {
  Button,
} from '@mui/material';

export default function Profile() {
  const [tab, setTab] = useState(0);
  const { user } = useStore();
  const [profile, setProfile] = useState<{
    name: string,
    email: string,
    id: number,
    followers: any[],
    following: any[]
  }>()

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const LIMIT = 2;

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const res = await clientSideAxios.get(`/murmurs/me?page=${pageNumber}&limit=${LIMIT}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      });

      const newPosts = res.data.data;
      setPosts(prev => [...prev, ...newPosts]);
      if (newPosts.length < LIMIT) setHasMore(false);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await clientSideAxios.get(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      });

      setProfile(res.data)
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };


  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    fetchProfile()
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleLikeToggle = async (postId: number, shouldLike: boolean) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isAlreadyLiked = post.likes.some((like: any) => like.userId === user?.id);
        let updatedLikes;

        if (shouldLike && !isAlreadyLiked) {
          updatedLikes = [...post.likes, { userId: user?.id }];
        } else if (!shouldLike && isAlreadyLiked) {
          updatedLikes = post.likes.filter((like: any) => like.userId !== user?.id);
        } else {
          updatedLikes = post.likes;
        }

        return { ...post, likes: updatedLikes };
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      await clientSideAxios.post(
        `/murmurs/${shouldLike ? 'like' : 'unlike'}/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const handleDelete = async (postId: number) => {
    const updatedPosts = posts.filter(post => postId != post.id);
    setPosts(updatedPosts);
    try {
      await clientSideAxios.delete(
        `/murmurs/me/delete/${postId}`,

        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      {/* Profile Header */}
      <ProfileDetails
        coverImage=""
        avatar="https://i.pravatar.cc/150?img=18"
        name={user?.name || ""}
        username={`@${user?.name.toLowerCase().replace(/\s+/g, '')}`}
        bio={profile?.email}
        location="Poland"
        joinDate="March 2024"
        followers={profile?.followers.length || 0}
        following={profile?.following.length || 0}
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
      {tab === 0 && <>

        {posts.map((post, i) => (
          <MurmurCard
            key={i}
            id={post.id}
            user={{
              name: post.user.name,
              username: `@${post.user.name.toLowerCase().replace(/\s+/g, '')}`,
              avatar: `${post.user.avatar || ""}`,
            }}
            content={post.content}
            media={post.media}
            likes={post.likes}
            isLiked={post.likes.some((like: any) => like.userId === user?.id)}
            onLikeToggle={handleLikeToggle}
            onDelete={handleDelete}
            isOwner={post.user.id == user?.id}
          />
        ))}

        {hasMore && (
          <div className="text-center my-4">

            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              fullWidth
              sx={{ mt: 3, borderRadius: 8, textTransform: 'none', fontWeight: 'bold' }}
            >
              Load More
            </Button>
          </div>
        )}
      </>

      }

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
