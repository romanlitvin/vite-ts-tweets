import { FC, useEffect, useState } from 'react';
import { Container, LinkToHome, List, MenuCont } from './Tweets.styled';
import {
  AxiosApiServiceGet,
  AxiosApiServicePut,
} from '../../components/services/AxiosApiService';
import { Tweet } from '../../components/Tweet/Tweet';
import { Button } from '../../components/Button/Button';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import type { FollowOption } from '../../components/Dropdown/Dropdown';

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
  const [filter, setFilter] = useState<string>('show all');

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
      setItems(
        items.map((i) =>
          i.id === userId ? { ...i, followers: updatedFollowers } : i
        )
      );
      await AxiosApiServicePut({
        ...user,
        followers: updatedFollowers,
      });
    } catch (error) {
      console.log(`IsError: ${error}`);
    }
  };

  const getVisibleTweets = (filter: string) => {
    switch (filter) {
      case 'show all':
        return items;
      case 'follow':
        return items.filter((i) => !followedUsers.includes(i.id));
      case 'followings':
        return items.filter((i) => followedUsers.includes(i.id));
      default:
        return items;
    }
  };

  const filterChange = (option: FollowOption | null) => {
    setFilter(option?.value || 'show all');
  };

  return (
    <Container>
      {!isLoading && items && (
        <>
          <MenuCont>
            <LinkToHome to='/'>Back</LinkToHome>
            <Dropdown onChange={filterChange} />
          </MenuCont>
          <List>
            {getVisibleTweets(filter).map(({ tweets, followers, id }, i) => {
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
          {items.length % 3 === 0 && <Button onClick={loadMore} />}
        </>
      )}
    </Container>
  );
};

export default Tweets;
