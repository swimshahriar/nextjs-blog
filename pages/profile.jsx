import Head from 'next/head';
import { Button, Container, Card } from 'react-bootstrap';
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
        <Container>
          <div className="text-right my-3">
            <Button variant="info">
              <Link href="/new-post">
                <a className="addbtn">+ ADD</a>
              </Link>
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  className="m-2"
                  style={{ width: '30%', minWidth: '300px' }}
                  key={post.id}
                >
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
                      <Link href={`/post/${post.id}`}>
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
            display: 'flex' !important;
            justify-content: 'center';
            align-items: 'center';
          }
          .post-card {
            width: '33%' !important;
          }
        `}
      </style>
    </div>
  );
};

export default profile;
