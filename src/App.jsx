import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Manager from "./Manager.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Manager />
  )
}

export default App
