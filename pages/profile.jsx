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

          <Row>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Col xs={6} sm={4} md={3} key={post.id} className="m-2">
                  <Card style={{ minWidth: '15rem' }}>
                    <Card.Img variant="top" src="#" />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body.slice(0, 100)}...</Card.Text>
                      <Button variant="outline-info" className="color">
                        <Link href={`/${post.title}`}>
                          <a className="addbtn color">See Details</a>
                        </Link>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <h1 className="text-center m-3">Loading...</h1>
            )}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default profile;
