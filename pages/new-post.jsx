import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { storage, db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const newPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const types = ['image/png', 'image/jpeg'];

  // picking the image file and set it to 'file'
  const changeHandler = (event) => {
    let selectedFile = event.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError('');
    } else {
      setImage(null);
      setError('Please select a valid image type! (ends with .png/.jpeg)');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const storageRef = storage.ref(
      image.name + '_' + auth.user.uid + '_' + title
    );

    await storageRef.put(image).catch((error) => setError(error.message));
    await storageRef.getDownloadURL().then((imgUrl) => {
      const dbModel = {
        createdAt: new Date().toDateString(),
        imgUrl,
        userId: auth.user.uid,
        title,
        body,
      };

      db.collection('posts')
        .add(dbModel)
        .then(() => {
          setLoading(false);
          router.push('/profile');
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
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
            <Form.Group controlId="imageInput">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                required
                type="file"
                size="lg"
                onChange={changeHandler}
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
