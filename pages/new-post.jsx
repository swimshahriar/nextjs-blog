import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import firebase, { timeStamp } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const getStaicProps = () => {
  const auth = useAuth();
  let userId;
  setTimeout(() => {
    userId = auth.user.uid;
  }, 1000);

  return {
    props: {
      userId,
    },
  };
};

const newPost = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fireStore = firebase.firestore();

  const dbModel = {
    createdAt: timeStamp(),
    userId,
    title,
    body,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    fireStore
      .collection('posts')
      .add(dbModel)
      .then(() => {
        setLoading(false);
        router.push('/profile');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <Head>
        <title>New Post</title>
      </Head>
      <style jsx>{`
        .link:link,
        .link:visited {
          color: #15a3b8;
        }
      `}</style>

      <header>
        <NavBar />
      </header>

      <main>
        <Container className="mt-4">
          <div className="text-center">
            <h1>Add New Post</h1>
            <Link href="/profile">
              <a className="link">👈 Back to Dashboard</a>
            </Link>
          </div>

          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="text-center mt-3">
                {error}
              </Alert>
            )}
            <Form.Group controlId="titleInput">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="title of the post"
                size="lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="postBodyInput">
              <Form.Label>Body:</Form.Label>
              <Form.Control
                required
                rows={10}
                as="textarea"
                placeholder="post body..."
                size="lg"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-4">
              {loading ? (
                <Button variant="info" disabled>
                  <Spinner
                    as="span"
                    size="sm"
                    animation="grow"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button type="submit" variant="info" size="lg">
                  + ADD
                </Button>
              )}
            </div>
          </Form>
        </Container>
      </main>
    </div>
  );
};

export default newPost;
