import { FC, useEffect, useState } from 'react';
import { Container, LinkToHome, List } from './Tweets.styled';
import {
  AxiosApiServiceGet,
  AxiosApiServicePut,
} from '../../components/services/AxiosApiService';
import { Tweet } from '../../components/Tweet/Tweet';
import { Button } from '../../components/Button/Button';

export interface ITweet {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  id: string;
}

const getFollowedUsers = (): string[] => {
  const followedUsers = JSON.parse(localStorage.getItem('followed') || '""');
  return followedUsers ? followedUsers : [];
};

const Tweets: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [followedUsers, setFollowedUsers] = useState(getFollowedUsers);

  useEffect(() => {
    const abortController = new AbortController();
    const getTweets = async () => {
      try {
        setIsLoading(true);
        const responseData = await AxiosApiServiceGet(page, abortController);
        if (responseData.length > 0) {
          setItems((prevState) => [...prevState, ...responseData]);
        }
      } catch (error) {
        console.log(`IsError: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getTweets();
    return () => abortController.abort();
  }, [page]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (followedUsers)
      localStorage.setItem('followed', JSON.stringify(followedUsers));
  }, [followedUsers]);

  const followUnfollowUser = async (userId: string) => {
    const user = items.find(({ id }) => id === userId) as ITweet;
    let updatedFollowers: number;
    try {
      if (followedUsers.includes(userId)) {
        const result = followedUsers.filter((id) => id !== userId);
        setFollowedUsers(result);
        updatedFollowers = user.followers - 1;
      } else {
        setFollowedUsers((prevState) => [...prevState, userId]);
        updatedFollowers = user.followers + 1;
      }
      await AxiosApiServicePut({
        ...user,
        followers: updatedFollowers,
      });
      setItems(
        items.map((i) =>
          i.id === userId ? { ...i, followers: updatedFollowers } : i
        )
      );
    } catch (error) {
      console.log(`IsError: ${error}`);
    }
  };

  return (
    <Container>
      <LinkToHome to='/'>Back</LinkToHome>
      {!isLoading && items && (
        <List>
          {items.map(({ tweets, followers, id }, i) => {
            return (
              <Tweet
                id={id}
                key={id}
                tweets={tweets}
                followers={followers}
                isFirstNewResultIndex={i === items.length - 3}
                followUnfollowUser={followUnfollowUser}
                followedUsers={followedUsers}
              ></Tweet>
            );
          })}
        </List>
      )}
      {items.length % 3 === 0 && !isLoading && <Button onClick={loadMore} />}
    </Container>
  );
};

export default Tweets;
