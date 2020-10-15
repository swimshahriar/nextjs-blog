import Head from 'next/head';
import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';

import { useAuth } from '../hooks/useAuth';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

const profile = () => {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>
        <style jsx>
          {`
            .addbtn:link,
            .addbtn:visited {
              color: #fff;
              text-decoration: none;
            }
          `}
        </style>
        <Container>
          <div className="text-right my-3">
            <Button variant="info">
              <Link href="/new-post">
                <a className="addbtn">+ ADD</a>
              </Link>
            </Button>
          </div>
          <PostCard />
        </Container>
      </main>
    </div>
  );
};

export default profile;
