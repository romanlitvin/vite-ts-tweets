import { FC, useEffect, useState } from 'react';
import { LinkToHome } from './Tweets.styled';
import { AxiosApiService } from '../../components/services/AxiosApiService';
import { Tweet } from '../../components/Tweet/Tweet';

export interface ITweet {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  id: string;
}

const Tweets: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [isError, setIsError] = useState(false);

  console.log(items);

  useEffect(() => {
    const getTweets = async () => {
      try {
        setIsLoading(true);
        const responseData = await AxiosApiService(page);

        if (responseData.length > 0)
          setItems((prevState) => [...prevState, ...responseData]);
        // if (responseData.length > 0) setItems(responseData);
      } catch (error) {
        setIsError(true);
        console.log(`IsError: ${isError}, ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getTweets();
  }, [page, isError]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div>
      <LinkToHome to='/'>Back</LinkToHome>
      {!isLoading && items && (
        <ul>
          {items.map(({ user, tweets, followers, avatar, id }) => {
            return (
              <Tweet
                key={id}
                user={user}
                tweets={tweets}
                followers={followers}
                avatar={avatar}
                id={id}
              ></Tweet>
            );
          })}
        </ul>
      )}
      {items.length > 0 && <button onClick={loadMore} />}
      {/* {items.length > 0 && totalHits - 11 >= 1 && <Button onClick={loadMore} />} */}
    </div>
  );
};

export default Tweets;
