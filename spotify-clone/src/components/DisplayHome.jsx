import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/frontend-assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar/>
      <div className='mt-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
           {albumsData.map((item,index) => (
          <AlbumItem
            key={index}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item.id}
          />
        ))}
        </div>
      </div>
       <div className='mt-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
           {songsData.map((item,index) => (
          <SongItem
            key={index}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item.id}
          />
        ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome
