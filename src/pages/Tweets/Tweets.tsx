import { FC } from 'react';
import { LinkToHome } from './Tweets.styled';

const Tweets: FC = () => {
  return (
    <div>
      <LinkToHome to='/home'>Back to Home</LinkToHome>
    </div>
  );
};

export default Tweets;
