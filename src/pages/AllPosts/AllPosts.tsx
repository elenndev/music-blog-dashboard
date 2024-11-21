import React, { useContext, useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import './components/static/All_posts.css';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';
import FunctionGetId from '../Dashboard/components/Type_FunctionGetId.tsx';
import { DashboardContext } from '../Dashboard/components/Context_Dashboard.tsx';
import Model_Post from '../../components/InterfacePost.tsx';
import axios from 'axios';
import Button_GoToDrafts from '../Dashboard/components/Button_GoToDrafts.tsx';

const AllPosts: React.FC<{
  isDashboard?: boolean,
  functionEdit?: FunctionGetId,
  onEdit?: boolean    
}> = ({ isDashboard = false, functionEdit }) => {
  const [posts, setPosts] = useState<Model_Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("DashboardContext não está disponível.");
  }

  const { submittedPost, setOnSubmittedPost, deletePost, setOnDeletePost, onDrafts } = context;

  const getData = async () => {
    try {
      const result = await axios.get(onDrafts 
        ? '/data/draftExemplo.json' 
        : '/data/postExemplo.json');
      setPosts(result.data);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar os dados.");
      setLoading(false);
    }
  };


  useEffect(() => {
    if (submittedPost){
        getData()
        setOnSubmittedPost(false)
    }
}, [submittedPost])

    useEffect(() => {
        if (deletePost){
            getData()
            setOnDeletePost(false)
        }
    }, [deletePost])

    useEffect(() => {
        getData()
        setLoading(true)
    }, [onDrafts])

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return (
      <p>Carregando publicações</p>
    );
  }

  const Container_AllPosts = () => {
    return (
      <div className='container all-posts'>
        <div className='container_header'>
          <h2>Todos as {onDrafts? "rascunhos" : "publicações"}</h2>
          <span className="buttons_area">{isDashboard && <><Button_SignOut/><Button_GoToDrafts/></>}</span>
        </div>
        {loading && <p>Carregando {onDrafts? "rascunhos" : "publicações"}...</p>}
        <div className='card-container'>
          {posts.map((post) => (
            <CardPost key={post._id}
              post={post}
              isDashboard={isDashboard}
              functionEdit={functionEdit}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container_AllPosts />
  );
};

export default AllPosts;
