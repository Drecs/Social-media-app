import React, { useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const {authState} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(`http://localhost:3001/comments`, {
        CommentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        }
      }
    )
      .then((response) => {
        if(response.data.error){
          console.log(response.data.error);
        } else{
          const commentToAdd = { CommentBody: newComment, UserName: response.data.UserName, };
          setComments([...comments, commentToAdd]);
          setNewComment('');
        }
      });
  };


  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {headers:{
      accessToken: localStorage.getItem('accessToken')}
    }).then(()=>{
      setComments(comments.filter((val) => {
        return val.id !== id;
      }))
    }); 
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        }
      }
    ).then(()=>{
      navigate('/');
      });
      };

  return (
    <div className="postpage">
      <div className="leftside">
        <div className="title">{postObject.title}</div>
        <div className="body">{postObject.PostText}</div>
        <div className="footer">{postObject.UserName} 
          {authState.UserName===postObject.UserName &&
        <button onClick ={ () => {
          deletePost(postObject.id);
        }}>Delete Post</button>}</div>
      </div>
      <div className="rigtside">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            className="inputComment"
          />
          <button onClick={addComment} className="addCommentButton">
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.CommentBody}
                <label>  username: {comment.UserName}</label>
                {authState.UserName===comment.UserName &&<button onClick={() => {
                  deleteComment(comment.id)}}> X </button>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
