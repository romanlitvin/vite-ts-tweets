export interface FollowOption {
  readonly value: string;
  readonly label: string;
}

export interface ITweet {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  id: string;
}
