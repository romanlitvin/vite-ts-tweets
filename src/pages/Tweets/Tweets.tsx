import { FC, useEffect, useState } from 'react';
import { Container, LinkToHome, List, MenuCont } from './Tweets.styled';
import {
  AxiosApiServiceGet,
  AxiosApiServicePut,
} from '../../components/services/AxiosApiService';
import { Tweet } from '../../components/Tweet/Tweet';
import { Button } from '../../components/Button/Button';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { SingleValue } from 'react-select';
import type { FollowOption, ITweet } from '../../types/types';

const getFollowedUsers = (): string[] => {
  // Bad parsing. Better to use try-catch block. JSON.parse('""') can throw an error.
  const followedUsers = JSON.parse(localStorage.getItem('followed') || '""');
  // Can be simplified to return followedUsers || [];
  return followedUsers ? followedUsers : [];
};

const Tweets: FC = () => {
  // Page state is not used. It can be replaced with useRef.
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [followedUsers, setFollowedUsers] = useState(getFollowedUsers);
  // Bad filter name. Usually some agnostic constants (string or number) are used for filtering.
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
    // Bad data handling (on page state change). Safer and convenient to handle a direct data fetching (i.e. on button press or on end reached).
    // But fore sure not on page state change. Since it can produce undesired side effects.
  }, [page]);

  useEffect(() => {
    // Same here.
    // 1. Better to use try-catch block. JSON.stringify(null) can throw an error.
    // 2. localstorage will save the data on every reference change. Which is for sure not optimal.
    // It must safe data only when new data is available, but not on ref change.
    if (followedUsers)
      localStorage.setItem('followed', JSON.stringify(followedUsers));
  }, [followedUsers]);

  // Bad naming. Usually this kind of operation is named Toggle (i.e. toggleUserState)
  const followUnfollowUser = async (userId: string) => {
    // Bypass ts warning with as asserting. Since, find can throw an undefined and the app will crash.
    const user = items.find(({ id }) => id === userId) as ITweet;
    // Bad naming. updatedFollowers doesn't sound like a number. (which it's actually is)
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
      // Bad handling of prev data.
      // Prev state should be used here, since state change is async (cals render)
      setItems(prev =>
        prev.map((i) =>
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

  const filterChange = (option: SingleValue<FollowOption>) => {
    setFilter(option?.value || 'show all');
  };

  // No need to be a function. Variable is enough. Since filter value can be read from state.
  const getVisibleTweets = (filter: string) => {
    switch (filter) {
      case 'show all':
        return items;
      case 'follow':
        // Bad naming 'i'
        return items.filter((i) => !followedUsers.includes(i.id));
      case 'followings':
        // same here
        return items.filter((i) => followedUsers.includes(i.id));
      default:
        return items;
    }
  };

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
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
                  // JSX can be used.
                />
              );
            })}
          </List>
          {
            // Weird condition for button show.
          }
          {items.length % 3 === 0 && <Button onClick={loadMore} />}
        </>
      )}
    </Container>
  );
};

export default Tweets;
