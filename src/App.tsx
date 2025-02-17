// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Body from './components/body'
import Header from './components/header'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className="border rounded h-100 mb-4 d-flex flex-column overflow-hidden">
      <Header />
      <div className="p-2 d-flex h-100 flex-column overflow-hidden">
      <Body />
      </div>
    </div>
    </>
  )
}

export default App
