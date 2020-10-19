import Head from 'next/head';
import { Button, Container, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import NavBar from '../components/NavBar';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export const getStaticProps = async () => {
  let posts = [];
  await db
    .collection('posts')
    .orderBy('createdAt', 'desc')
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

const Home = ({ posts }) => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>
        <Container>
          <motion.h1
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Blog Posts
          </motion.h1>
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            className="my-5"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
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
                    style={{ width: '100%', height: '250px' }}
                    alt={post.imageName}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text className="font-weight-light">
                      {post.userEmail}
                    </Card.Text>
                    <Card.Text className="font-weight-light">
                      {post.createdAt}
                    </Card.Text>
                    <Button
                      variant="outline-info"
                      className="color"
                      onClick={() => router.push(`/post/${post.id}`)}
                    >
                      See Details
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2 className="text-center m-3">NO POSTS YET!</h2>
            )}
          </motion.div>
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

export default Home;
