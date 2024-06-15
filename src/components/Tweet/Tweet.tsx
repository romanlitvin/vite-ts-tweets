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
  tweets: number;
  followers: number;
  firstNewResultIndex: boolean;
}

export const Tweet: FC<ITweetProps> = ({
  tweets,
  followers,
  firstNewResultIndex,
}) => {
  const firstNewResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstNewResultRef.current) {
      setTimeout(() => {
        firstNewResultRef.current?.focus();
      }, 100);
    }
  }, [firstNewResultIndex]);

  return (
    <Container ref={firstNewResultIndex ? firstNewResultRef : undefined}>
      <Logo src='src/assets/Logo.svg' alt='GoIt_logo' />
      <Stripe></Stripe>
      <UserImg src='src/assets/Boy.svg' alt='User_photo' />
      <TweetsCount>{tweets} TWEETS</TweetsCount>
      <FollowersCount>
        {Number(followers).toLocaleString()} FOLLOWERS
      </FollowersCount>
      <FollowButton>FOLLOW</FollowButton>
    </Container>
  );
};

{
  /* <p>{`${id} ${user} ${tweets} ${followers} ${avatar} 
     ${firstNewResultIndex} ${firstNewResultRef.current}`}</p> */
}
