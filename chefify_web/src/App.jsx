import { useState } from 'react'
import Home from './pages/Home'
import Recipe from './components/Recipe';
import DishDetails from './components/DishDetails';
import Dishes from './components/Dishes';
import { Route } from 'react-router-dom';
import { BrowserRouter, createBrowserRouter, Router, RouterProvider, Routes } from 'react-router-dom';
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} path="/" />
          <Route path='/home' element={<Home />} />
          <Route path='/recipe' element={<Recipe />} />
          <Route path='/dish' element={<Dishes />} />
          <Route path="/dish/:id" element={<DishDetails />} />
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default App;
