import { useState } from 'react'

import './App.css'
import Navabar from './Components/Navabar';
import AddCourse from './Components/AddCourse';
import PSLR_Courses from './Components/PSLR_Courses';
import { Route, Routes } from 'react-router-dom';
import EditAndUpdate from './Components/EditAndUpdate';
import AlertDialogSlide from './Components/AlertDialogSlide';


function App() {

 


  return (
    <>


  <div  className='bg-pink-200 min-h-screen'>

     <Navabar />


<Routes>
  <Route path='/' element={<PSLR_Courses />} />
  <Route path='add-course' element={<AddCourse />}/>
  <Route path='/edit-data/:id' element={<EditAndUpdate />}/>
</Routes>
  </div>
    </>
  )
}

export default App
