import './components/App.css';
import { Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import Home from './pages/Home/Home'
import ReadPost from './pages/ReadPost/ReadPost'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ProtectedRoute from './pages/Dashboard/ProtectedRoute';
import { EditModeProvider } from './pages/Dashboard/components/Context_EditMode';



function App() {

  return (
    <EditModeProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/all-posts' element={<AllPosts />}></Route>
        <Route path='/read/:id' element={<ReadPost />}></Route>
        <Route path='/blog-login' element={<Login />}></Route>
        <Route path='/dashboard' element={
            <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
        <Route path='*' element={<h2>Página nao encontrada</h2>}></Route>
      </Routes>
    </EditModeProvider>
  )
}

export default App
