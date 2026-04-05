import React from 'react';
import 'remixicon/fonts/remixicon.css'
import { Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Datepage from './pages/Datepage';
import Informationpage from './pages/Informationpage';
import Tourplanpage from './pages/Tourplanpage';
import Locationpage from './pages/Locationpage';
import Gallerypage from './pages/Gallerypage';
import Auth from './pages/Auth';
import AdminPage from './pages/AdminPage';
import UpdatePage from './pages/UpdatePage';

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Routes>
        {/* <Route path='/' element={<Landingpage/>}/> */}
        <Route path='/date' element={<Datepage/>}/>
        <Route path='/information/:id' element={<Informationpage/>}/>
        <Route path='/tourplan' element={<Tourplanpage/>}/>
        <Route path='/location' element={<Locationpage/>}/>
        <Route path='/gallery' element={<Gallerypage/>}/>
        <Route path='/' element={<Auth/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/update/:id' element={<UpdatePage/>}/>
      </Routes>
    </div>
  )
}

export default App
