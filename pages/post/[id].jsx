import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Button } from 'react-bootstrap';
import marked from 'marked';
import { motion } from 'framer-motion';

import NavBar from '../../components/NavBar';
import { db } from '../../firebase';

export const getStaticPaths = async () => {
  let posts = [];
  await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      const postLists = [];
      querySnapshot.forEach((doc) => {
        postLists.push({
          id: doc.id,
        });
      });
      posts = [...postLists];
    });

  const paths = posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  let post = {};
  await db
    .collection('posts')
    .doc(params.id)
    .get()
    .then((fetchedPost) => (post = fetchedPost.data()));

  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

const Post = ({ post }) => {
  const router = useRouter();
  const [loadComment, setLoadComment] = useState(false);

  const loadComments = () => {
    setLoadComment(true);
    const disqus_config = function () {
      this.page.url = window.location.href; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = post.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    const s = document.createElement('script');
    s.src = 'https://nextjs-blog01.disqus.com/embed.js';
    s.setAttribute('data-timestamp', Date.now().toString());
    (document.head || document.body).appendChild(s);
  };

  return (
    <div>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Head>
            <title>{post.title}</title>
          </Head>
          <header>
            <NavBar />
          </header>
          <motion.main initial={{ x: +100 }} animate={{ x: 0 }}>
            <Container>
              <img
                src={post.imgUrl}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '50vh',
                  backgroundSize: 'cover',
                }}
                className="my-3"
              />
              <h1>{post.title}</h1>
              <p>{post.userEmail}</p>
              <p>{post.createdAt}</p>
              <div
                id="post-body"
                dangerouslySetInnerHTML={{ __html: marked(post.body) }}
              ></div>
            </Container>
          </motion.main>
        </>
      )}
      <footer className="m-4">
        <Container>
          {!loadComment && (
            <div className="text-center">
              <Button variant="info" onClick={loadComments}>
                Load Comments
              </Button>
            </div>
          )}

          <div id="disqus_thread"></div>
        </Container>
      </footer>
    </div>
  );
};

export default Post;
