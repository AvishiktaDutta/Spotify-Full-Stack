import React, { useContext } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'
import Display from './components/Display.jsx'
import { PlayerContext } from './context/PlayerContext.jsx'
const App = () => {
  const ctx = useContext(PlayerContext)
  const { audioRef, track } = ctx || {}

  if (!ctx) {
    return <div className='h-screen bg-black text-white'>Loading...</div>
  }

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
       <Sidebar/>
       <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track?.file} preload='auto'></audio>
    </div>
  )
}

export default App
