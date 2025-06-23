import React, { useEffect, useState } from 'react'
import FollowerCard from '../components/FollowerCard'
import { useStore } from '../context/StoreContext';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import {
    Button,
} from '@mui/material';

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useStore();
    const fetchNewUsers = async (pageNumber) => {
        try {
            const res = await clientSideAxios.get(`follow/suggest?page=${pageNumber}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }); // your endpoint


            const newUsers = res.data.data;

            setUsers(prev => [...prev, ...newUsers]);
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
            users.map((user, i) => <FollowerCard
                key={i}
                id={user.id}
                name={user.name}
                username={user.email}
                avatar={user.avatar || ""}
                bio="NAN"
                isFollowing={false}
                followingCount={user.following.length}
                followersCount={user.followers.length}
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

export default Users