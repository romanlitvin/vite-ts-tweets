import { FC, useEffect, useRef } from 'react';
import {
  Container,
  FollowButton,
  FollowersCount,
  Logo,
  Stripe,
  TweetsCount,
  UserImg,
} from './Tweet.styled';

interface ITweetProps {
  id: string;
  tweets: number;
  followers: number;
  isFirstNewResultIndex: boolean;
  followUnfollowUser: (id: string) => void;
  followedUsers: string[];
}

export const Tweet: FC<ITweetProps> = ({
  id,
  tweets,
  followers,
  isFirstNewResultIndex,
  followUnfollowUser,
  followedUsers,
}) => {
  const firstNewResultRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstNewResultRef.current) {
      firstNewResultRef.current?.focus();
    }
  }, [isFirstNewResultIndex]);

  return (
    <Container>
      <Logo src='src/assets/Logo.svg' alt='GoIt_logo' />
      <Stripe></Stripe>
      <UserImg src='src/assets/Boy.svg' alt='User_photo' />
      <TweetsCount>{tweets} TWEETS</TweetsCount>
      <FollowersCount>
        {Number(followers).toLocaleString()} FOLLOWERS
      </FollowersCount>
      <FollowButton
        ref={isFirstNewResultIndex ? firstNewResultRef : undefined}
        type='button'
        onClick={() => followUnfollowUser(id)}
        $isFollowing={followedUsers.includes(id)}
      >
        {followedUsers.includes(id) ? 'FOLLOWING' : 'FOLLOW'}
      </FollowButton>
    </Container>
  );
};
