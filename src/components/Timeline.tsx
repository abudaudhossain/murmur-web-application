import React, { useEffect, useState } from 'react'
import MurmurCard from '../components/Murmur/MurmurCard';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import { useStore } from '../context/StoreContext';
import {
    Button,
} from '@mui/material';

const Timeline = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useStore();
    const LIMIT = 10;

    const fetchPosts = async (pageNumber = 1) => {
        try {
            const res = await clientSideAxios.get(`/murmurs/timeline?page=${pageNumber}&limit=${LIMIT}`, {
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

    useEffect(() => {
        
        fetchPosts(page);
    }, [page]);

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

    return (
        <>
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
    );
};

export default Timeline;
