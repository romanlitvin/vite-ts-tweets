import { FC } from 'react';
import { ITweet } from '../../pages/Tweets/Tweets';

export const Tweet: FC<ITweet> = ({ user, tweets, followers, avatar, id }) => {
  return (
    <div>
      <p>{`${id} ${user} ${tweets} ${followers} ${avatar}`}</p>
    </div>
  );
};
