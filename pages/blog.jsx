import Head from 'next/head';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

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
        </Container>
      </main>
    </div>
  );
};

export default blog;
