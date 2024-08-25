
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import Manage from './components/Manage';
import Navigation from './components/Navigation';

import Home from './components/Home';


function App() {


  return (
    <div className='max-w-screen-2xl mx-auto'>
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
