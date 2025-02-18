import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mycomponents from './components/Mycomponents'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* Hello world */}
        <Mycomponents></Mycomponents> //class component
      </div>
    </>)
}

export default App
