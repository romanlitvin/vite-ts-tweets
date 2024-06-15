import { FC, useEffect, useState } from 'react';
import { Container, LinkToHome, List } from './Tweets.styled';
import { AxiosApiService } from '../../components/services/AxiosApiService';
import { Tweet } from '../../components/Tweet/Tweet';
import { Button } from '../../components/Button/Button';

interface ITweet {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  id: string;
}

// type TweetWithoutUserAvatarId = Omit<ITweet, 'user' | 'avatar' | 'id'>;

const Tweets: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  //   const [firstNewResultIndex, setFirstNewResultIndex] = useState(3);
  //   const [isError, setIsError] = useState(false);
  //   const totalHits = useRef(0);

  useEffect(() => {
    const abortController = new AbortController();
    const getTweets = async () => {
      try {
        setIsLoading(true);
        const responseData = await AxiosApiService(page, abortController);
        setTotalHits(responseData.length);
        if (totalHits > 0) {
          setItems((prevState) => [...prevState, ...responseData]);
          //   setItems([...items, ...responseData]);
        }
        // setFirstNewResultIndex(items.length - 3);
      } catch (error) {
        // setIsError(true);
        console.log(`IsError: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getTweets();
    return () => abortController.abort();
  }, [page, totalHits]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container>
      <LinkToHome to='/'>Back</LinkToHome>
      {!isLoading && items && (
        <List>
          //TODO: add spinner
          {items.map(({ tweets, followers, id }, i) => {
            return (
              <Tweet
                key={id}
                tweets={tweets}
                followers={followers}
                firstNewResultIndex={i === items.length - 3}
              ></Tweet>
            );
          })}
        </List>
      )}
      {items.length > 0 && totalHits > 2 && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </Container>
  );
};

export default Tweets;
