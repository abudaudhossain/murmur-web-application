import React from 'react'
import FollowerCard from '../components/FollowerCard'

const Follower = () => {
  return <>
    <FollowerCard
      name="Alex Kim"
      username="@alexkim"
      avatar="https://i.pravatar.cc/150?img=33"
      bio="Frontend Developer • Love React ⚛️"
      isFollowing={true}
    />
    <FollowerCard
      name="Alex Kim"
      username="@alexkim"
      avatar="https://i.pravatar.cc/150?img=33"
      bio="Frontend Developer • Love React ⚛️"
      isFollowing={true}
    />
    <FollowerCard
      name="Alex Kim"
      username="@alexkim"
      avatar="https://i.pravatar.cc/150?img=33"
      bio="Frontend Developer • Love React ⚛️"
      isFollowing={false}
      
    />

  </>
}

export default Follower