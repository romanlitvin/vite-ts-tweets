// Bad naming convention. Not clear why module is named Button, when styles is ButtonLoadMore...

import { FC } from 'react';
import { ButtonLoadMore } from './Button.styled';

type Props = {
  onClick: () => void;
};

export const Button: FC<Props> = ({ onClick }) => {
  return (
    <ButtonLoadMore type='button' onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};
