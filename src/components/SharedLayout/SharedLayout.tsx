import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Header, Link } from './SharedLayout.styled';

const SharedLayout = () => (
  <Container>
    <Header>
      <nav>
        <Link to='/' end>
          Home
        </Link>
        <Link to='/tweets'>Tweets</Link>
      </nav>
    </Header>
    <Suspense fallback={<div> Loading page...</div>}>
      <Outlet />
    </Suspense>
  </Container>
);

export default SharedLayout;
