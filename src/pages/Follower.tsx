import React, { useEffect, useState } from 'react'
import FollowerCard from '../components/FollowerCard'
import { useStore } from '../context/StoreContext';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import {
  Button,
} from '@mui/material';

const Follower = () => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useStore();
  const fetchNewUsers = async (pageNumber) => {
    try {
      const res = await clientSideAxios.get(`follow/followers?page=${pageNumber}&limit=10`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      }); // your endpoint


      const newFollowers = res.data.followers;

      setFollowers(prev => [...prev, ...newFollowers]);
      setHasMore(res.data.totalPages > page)

    } catch (err) {
      console.error("Failed to fetch new users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewUsers(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };


  return <>

    {
      followers.map((follower, i) => <FollowerCard
        key={i}
        id={follower.id}
        name={follower.name}
        username={follower.email}
        avatar={follower.avatar || ""}
        bio="NAN"
        isFollowing={follower.isFollowing}
        followingCount={follower.followingCount}
        followersCount={follower.followersCount}
      />)
    }

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

export default Follower