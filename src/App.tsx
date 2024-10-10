// import fetchPosts from './supabaseClient'
// import AllPosts from './pages/AllPosts/AllPosts.tsx';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import Home from './pages/Home/Home'
import ReadPost from './pages/ReadPost/ReadPost'
import Dashboard from './pages/Dashboard/Dashboard';
import FormLogin from './pages/Login/FormLogin';




function App() {

  return (
    // 
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/all-posts' element={<AllPosts />}></Route>
        <Route path='/read/:id' element={<ReadPost />}></Route>
        <Route path='/new' element={<Dashboard />}></Route>
        <Route path='/blog-login' element={<FormLogin />}></Route>
        <Route path='*' element={<h2>Página nao encontrada</h2>}></Route>
      </Routes>
  )
}

export default App
