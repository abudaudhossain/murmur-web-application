import React, { useEffect, useState } from 'react'
import MurmurCard from '../components/Murmur/MurmurCard';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import { useStore } from '../context/StoreContext';


const Timeline = () => {
    const [posts, setPosts] = useState<any[]>([])
    const { user } = useStore()

    const handleFetchPost = async () => {
        const res = await clientSideAxios.get('/murmurs/timeline', {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        });
        console.log(res.data)
        return res.data;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await handleFetchPost();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handleLikeToggle = async (postId: number, shouldLike: boolean) => {
 
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      const isAlreadyLiked = post.likes.some((like: any) => like.userId === user?.id);
      let updatedLikes;

      if (shouldLike && !isAlreadyLiked) {
        updatedLikes = [...post.likes, { userId: user?.id }]; // Add like
      } else if (!shouldLike && isAlreadyLiked) {
        updatedLikes = post.likes.filter((like: any) => like.userId !== user?.id); // Remove like
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
    // Optionally revert like state here on error
  }
};


    return (
        <>
            {
                posts.map((post) => {
                    // const isLiked = post.likes.some((like: any) => like.userId === user?.id);

                    return (
                        <MurmurCard
                            key={post.id}
                            id={post.id}
                            user={{
                                name: post.user.name,
                                username: `@${post.user.name.toLowerCase().replace(/\s+/g, '')}`,
                                avatar: `https://i.pravatar.cc/150?u=${post.user.id}`,
                            }}
                            content={post.content}
                            media={post.media[0]} 
                            likes={post.likes}
                            isLiked={post.likes.some((like: any) => like.userId === user?.id)}
                            onLikeToggle={handleLikeToggle}
                        />

                    );
                })
            }
        </>
    )
}

export default Timeline