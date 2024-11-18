import './components/static/App.css';
import { Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import Home from './pages/Home/Home'
import ReadPost from './pages/ReadPost/ReadPost'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ProtectedRoute from './pages/Dashboard/ProtectedRoute';
import { DashboardProvider } from './pages/Dashboard/components/Context_Dashboard';
import AboutMe from './pages/AboutMe/AboutMe';
import { useEffect } from 'react';




function App() {

  useEffect(() => {
    if (!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'dark')
    }
}, [])

  return (
    <DashboardProvider>
      <Routes>
        <Route path='/todas-publicacoes' element={<AllPosts />}></Route>
        <Route path='/' element={
            <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
        <Route path='*' element={<h2>Página nao encontrada</h2>}></Route>
      </Routes>
    </DashboardProvider>
  )
}

export default App
