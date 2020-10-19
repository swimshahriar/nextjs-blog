import Head from 'next/head';
import { Form, Container, Button, Alert, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import NavBar from '../components/NavBar';
import { useAuth } from '../hooks/useAuth';

const auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!isLogin) {
      setLoading(true);
      await auth
        .signup(email, password)
        .then(() => router.push('/profile'))
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setLoading(true);
      await auth
        .signin(email, password)
        .then(() => router.push('/profile'))
        .catch((error) => setError(error.message));
    }

    setLoading(false);
  };
  return (
    <div>
      <Head>
        <title>{isLogin ? 'Login' : 'Register'}</title>
      </Head>

      <header>
        <NavBar />
      </header>
      <motion.main initial={{ x: +100 }} animate={{ x: 0 }}>
        <Container>
          <h1 className="text-center mt-5">{isLogin ? 'Login' : 'Register'}</h1>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="text-center mt-3">
                {error}
              </Alert>
            )}
            <Form.Group controlId="emailInput">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="passwordInput">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="******"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  {isLogin ? 'Login' : 'Register'}
                </Button>
              )}
            </div>
          </Form>
          <div className="text-center mt-3">
            <h6>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </h6>
            <Button
              variant="outline-info"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </div>
        </Container>
      </motion.main>
    </div>
  );
};

export default auth;
