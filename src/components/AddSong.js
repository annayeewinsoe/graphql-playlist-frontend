import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { SONGS } from './Playlist'

const ARTISTS = gql`
   {
      artists{
         id
         name
      }
   }
`

const ADD_SONG = gql`
   mutation($title: String!, $album: String!, $artistId: ID!){
      addSong(title: $title, album: $album, artistId: $artistId){
         id
         title
      }
   }
`

export default function AddSong() {
   const [title, setTitle] = useState('')
   const [album, setAlbum] = useState('')
   const [artistId, setArtistId] = useState('select artist')
   const scroll = document.getElementById("scroll-here")

   // QUERY
   const { loading, error, data } = useQuery(ARTISTS)

   const displayArtists = () => {
      if(loading) return <option disabled>Loading...</option>
      if(error) return <option disabled>Error</option>
      return data.artists.map(artist => (
         <option key={artist.id} value={artist.id}>{artist.name}</option>
      ))
   }

   // MUTATION
   const [addSong, MutationObj] = useMutation(ADD_SONG)

   // CUSTOM FUNCTIONS
   const handleSubmit = (e) => {
      e.preventDefault()
      addSong({
         variables: { title, album, artistId },
         refetchQueries: [{query: SONGS}]
      }).then(() => scroll.scrollIntoView({behavior: "smooth", block: "end", inline: "center"}))
      setTitle('')
      setAlbum('')   
   }

   return (
      <div id="add-song">
         <div>
            <p>Hi ! My name is Su Pyae Yee and</p>
            <p>I'm a very passionate</p>
            <p>Junior React Developer.</p>
            <p>Technologies used in this app are</p>
            <h4>React, Apollo, GraphQL, Express, MongoDB</h4>
         </div>
         <form onSubmit={handleSubmit}>
            <h1>Add A Song</h1>
            <input type="text" placeholder="Song Title" value={title} required
               onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Album" value={album} required
               onChange={e => setAlbum(e.target.value)} />
            <select onChange={e => setArtistId(e.target.value)} defaultValue={'DEFAULT'}>
               <option value="DEFAULT" disabled>Select Artist</option>
               {displayArtists()}
            </select>
            <input type="submit" value="Add" />
         </form>
      </div>
   )
}
