import Head from 'next/head';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import NavBar from '../components/NavBar';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export const getStaticProps = async () => {
  let posts = [];
  await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      const postLists = [];
      querySnapshot.forEach((doc) => {
        postLists.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      posts = [...postLists];
    });

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

const profile = ({ posts }) => {
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
            .color:link,
            .color:visited {
              color: rgb(21, 163, 184) !important;
            }
            .color:hover {
              color: #fff !important;
            }
            .post-flex {
              display: 'flex';
              justify-content: 'center';
              align-items: 'center';
            }
            .post-card {
              width: '30%' !important;
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
          <div className="post-flex">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card className="post-card m-2" key={post.id}>
                  <Card.Img
                    variant="top"
                    src={post.imgUrl}
                    style={{ width: '100%' }}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body.slice(0, 100)}...</Card.Text>
                    <Card.Text>{post.createdAt}</Card.Text>
                    <Button variant="outline-info" className="color">
                      <Link href={`/${post.title}`}>
                        <a className="addbtn color">See Details</a>
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h1 className="text-center m-3">NO POSTS YET!</h1>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
};

export default profile;
