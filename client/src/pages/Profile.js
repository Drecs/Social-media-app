import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from "axios";

function Profile() {
    let {id} = useParams()
    const [username, setUsername] = useState('');
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`
        ).then((response) => {
            setUsername(response.data.UserName);
        })

        
          axios.get(`http://localhost:3001/posts/byuserId/${id}`
          ).then((response) => {
              setListOfPosts(response.data);
          })

    }, []);
  return (
    <div className='ProfilePageContainer'>
        <div className='BasicInfo'><h1> UserName: {username} </h1></div>
        <div className='listOfPosts'>
        {listOfPosts.map((value, key) => {
        return (
          <div className='post' key={key} >
            <div className='title'>{value.title}</div>
            <div className='body' onClick={() =>
               navigate(`/post/${value.id}`)
              }>{value.PostText}</div>
              <div className='footer'>
                  {value.UserName}
                  <div className='like-section'>
                 <label>{value.Likes.length}</label>
                </div>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  )
}

export default Profile;
