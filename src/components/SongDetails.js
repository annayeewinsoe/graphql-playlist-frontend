import React from 'react'
import { gql, useQuery } from '@apollo/client'

const SONG = gql`
   query($id: ID!){
      song(id: $id){
         id
         title
         album
         artist{
            id
            name
            songs{
               id
               title
            }
         }
      }
   }
`

export default function SongDetails({ songId }) {
   const { loading, error, data } = useQuery(SONG, {variables: {id: songId}})

   const displayDetails = () => {
      if(loading) return <p>Loading...</p>;
      if(error) return <p>Click on a song to view details</p>; 
      const { song } = data
      return(
         <div>
            <h1>{song.title}</h1>
            <p><em>Artist: <span></span>{song.artist.name}</em></p>
            <p><em>Album: <span></span>{song.album}</em></p>
            <h4>Other songs by this artist:</h4>
            <ul id="other-songs">
               {song.artist.songs.map(s => (
                     <li key={s.id}>{s.title}</li>
               ))}
            </ul>
         </div>
      )
   }

   return (
      <div id="details">
         {displayDetails()}
      </div>
   )
}
