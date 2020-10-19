import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button, Container, Card, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import NavBar from '../components/NavBar';
import { db, storage } from '../firebase';
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
    revalidate: 2,
  };
};

const profile = ({ posts }) => {
  const auth = useAuth();
  const router = useRouter();

  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user) {
      const fetchedPosts = posts.filter(
        (post) => post.userId === auth.user.uid
      );
      setLoadedPosts(fetchedPosts);
    }
  }, [auth.user]);

  // delete handler
  const deleteHandler = (post) => {
    setLoading(true);
    const storageRef = storage.ref(
      post.imageName + '_' + auth.user.uid + '_' + post.title
    );

    // deleting from firestore
    db.collection('posts')
      .doc(post.id)
      .delete()
      .then(() => {})
      .catch((error) => {});

    // deleting from storage
    storageRef
      .delete()
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          location.reload();
        }, 4000);
      })
      .catch((error) => {});
  };

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
          <motion.h1
            className="mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your Posts
          </motion.h1>
          {auth.user && <p className="text-center my-3">{auth.user.email}</p>}
          <div className="text-center my-3">
            <Button variant="info" onClick={() => router.push('/new-post')}>
              + ADD
            </Button>
          </div>
          <p className="font-weight-light font-italic text-center">
            (It may take 2 - 5 seconds to perform an operation. Refresh the
            window to see the changes.)
          </p>
          {loading && (
            <h4 className="text-center" style={{ color: 'red' }}>
              Deleting...
            </h4>
          )}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
          >
            {loadedPosts.length > 0 &&
              loadedPosts.map((post) => (
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
                    <div className="text-center">
                      <Button
                        variant="outline-info"
                        className="color"
                        onClick={() => router.push(`/post/${post.id}`)}
                      >
                        See Details
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(post)}
                        className="ml-5"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            {loadedPosts.length <= 0 && (
              <h3 className="text-center m-3">NO POSTS YET!</h3>
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

export default profile;
