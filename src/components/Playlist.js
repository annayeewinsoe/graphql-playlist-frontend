import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import SongDetails from './SongDetails';

export const SONGS = gql`
   {
      songs{
         id
         title
      }
   }
`

export default function Playlist() {
   const [selected, setSelected] = useState(null)

   const { loading, error, data } = useQuery(SONGS);

   const displaySongs = () => {
      if(loading) return <h1>Loading...</h1>;
      if(error) return <h1>Error :(</h1>;
      return(
         data.songs.map(song => (
            <li key={song.id} onClick={() => setSelected(song.id)}>
               {song.title}
            </li>
         ))
      )
   }

   

   return(
      <div id="main">
         <div id="playlist">
            <ul>
               <h1>Playlist</h1>
               {displaySongs()}
            </ul>
            <div id="scroll-here" />
         </div>
         <SongDetails songId={selected} />
      </div>
   )
}

