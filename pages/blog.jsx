import Head from 'next/head';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

const blog = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>

      <header>
        <NavBar />
      </header>
      <main>
        <Container>
          <h1>Blog Page</h1>
          <PostCard />
        </Container>
      </main>
    </div>
  );
};

export default blog;
