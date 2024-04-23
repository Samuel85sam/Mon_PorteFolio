import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CRUD from '../Business/API-requests/C.R.U.D./CRUD';
import PostForm from '../components/Forms/Post/post.form';
import { Post } from '../Types-Interfaces/CRUD-Types/CRUD.types';
import { useAuthStore } from '../Zustand/authStore';

const PostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const [post, setPost] = useState<Post>();

  const redirect = async () => {
    if (isAuthenticated === false) {
      navigate(`/article-item/${id}`);
    } else if (id === 'new') {
        setPost(undefined);
      } else {
        const route = `posts/${id}`;
        const post = await CRUD.getForm(route, { populate: ['img', 'author'] });
        if (post !== undefined && '_id' in post) {
          setPost(post);
        }
      }
  };

  useEffect(() => {
    redirect();
  }, [id]);

  if (!post && id !== 'new') return <>loading...</>;

  return (
    <PostForm
      post={post}

    />
  );
};

export default PostPage;
