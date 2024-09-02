import React, {useContext, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
  const {authState} = useContext(AuthContext);
  let navigate = useNavigate();
  const initialValues = {
    title: '',
    PostText: '',
  };

 useEffect(() =>{
    if(!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, [authState, navigate]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must enter a title"),
    PostText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/posts', data, {
      headers: { accessToken: localStorage.getItem('accessToken')}
    }).then((response) => {
      navigate('/');
    });
  };

  return (
    <div className="CreatePostPage">
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Title:</label>
            <ErrorMessage name="title" component="span" />
            <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(EX. Title...)" />

            <label>Post:</label>
            <ErrorMessage name="PostText" component="span" />
            <Field autoComplete="off" id="inputCreatePost" name="PostText" placeholder="(EX. Post...)" />

            

            <button type="submit">Create Post</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;

