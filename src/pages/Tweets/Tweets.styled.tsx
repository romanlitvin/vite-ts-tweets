import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkToHome = styled(Link)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &:hover,
  &:focus {
    color: #471ca9;
  }
`;
