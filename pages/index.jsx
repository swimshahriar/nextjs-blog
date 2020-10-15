import Head from 'next/head';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextjs Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavBar />
      </header>

      <main>
        <Container>
          <h1>Home Page</h1>
        </Container>
      </main>
    </div>
  );
}
