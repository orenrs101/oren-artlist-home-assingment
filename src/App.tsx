import React, { useCallback, useRef, useState } from 'react';
import './App.scss';
import Comment from "./components/Comment/Comment";
import AddComment from "./components/Comment/AddComment";
import useCommentsSearch from "./custom-hooks/UseCommentsSearch";

function App() {

  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, comments, hasMore } = useCommentsSearch(pageNumber);

////////////////////////////////////////////////////////==Intersaction==////////////////////////////////////////////////

  const observer:React.MutableRefObject<IntersectionObserver | undefined> = useRef();
  const lastElementRef = useCallback(
      (node: any) => {
        if (loading) return;
        if (observer.current) {
          observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((enteries) => {
          if (enteries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) {
          observer.current.observe(node);
        }
      },
      [loading]
  );
////////////////////////////////////////////////////////==Render==//////////////////////////////////////////////////////

  return (
      <div className="App">
        <AddComment />

        <div className="comments-list">
          {comments.map((comment, index) => {
            return (comments.length === index + 1)
                ? <Comment key={comment.id} comment={comment} ref={lastElementRef}/>
                : <Comment key={comment.id} comment={comment} />
          })}
        </div>

        <div><h3>{loading && "Loading..."}</h3></div>
        <div>{error && "Error..."}</div>
      </div>
  );
}

export default App;