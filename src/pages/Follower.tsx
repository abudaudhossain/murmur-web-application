import React, { useEffect, useState } from 'react'
import FollowerCard from '../components/FollowerCard'
import { useStore } from '../context/StoreContext';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';

const Follower = () => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useStore();

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const res = await clientSideAxios.get('follow/followers?page=1&limit=5', {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        }); // your endpoint
        console.log(res.data)
        setFollowers(res.data.followers);
      } catch (err) {
        console.error("Failed to fetch new users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewUsers();
  }, []);

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
  return <>

    {
      followers.map(follower => <FollowerCard
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

  </>
}

export default Follower