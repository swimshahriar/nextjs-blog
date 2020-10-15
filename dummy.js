import React, { useEffect, useMemo, useState, useCallback } from 'react';
// import { createEditor, Transforms, Editor } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';
import Head from 'next/head';
// import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';

const newPost = () => {
  // const editor = useMemo(() => withReact(createEditor()), []);
  // const [value, setValue] = useState([
  //   {
  //     type: 'paragraph',
  //     children: [{ text: 'A line of text in a paragraph.' }],
  //   },
  // ]);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  // const renderElement = useCallback((props) => {
  //   switch (props.element.type) {
  //     case 'code':
  //       return <CodeElement {...props} />;
  //     default:
  //       return <DefaultElement {...props} />;
  //   }
  // }, []);

  return (
    <div>
      <Head>
        <title>New Post</title>
      </Head>
      <style jsx>{`
        .editor {
          border: 3px solid grey;
          height: 70vh;
          padding: 2rem;
        }
      `}</style>

      <header>
        <NavBar />
      </header>

      <main>
        <Container>
          <h1>Add New Post</h1>
          {/* <div className="editor">
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            >
              <Editable
                renderElement={renderElement}
                onKeyDown={(event) => {
                  if (event.key === '`' && event.ctrlKey) {
                    event.preventDefault();
                    // Determine whether any of the currently selected blocks are code blocks.
                    const [match] = Editor.nodes(editor, {
                      match: (n) => n.type === 'code',
                    });
                    // Toggle the block type depending on whether there's already a match.
                    Transforms.setNodes(
                      editor,
                      { type: match ? 'paragraph' : 'code' },
                      { match: (n) => Editor.isBlock(editor, n) }
                    );
                  }
                }}
              />
            </Slate>
          </div> */}
        </Container>
      </main>
    </div>
  );
};

// export default newPost;

// const CodeElement = (props) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = (props) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };
