import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Components
import Playlist from './components/Playlist'
import AddSong from './components/AddSong'

// Apollo client setup
const client = new ApolloClient({
  uri: 'https://graphql-song-playlist.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

export default function App() {
  return(
    <ApolloProvider client={client}>
      <h1 id="screen-err">Please use desktop or laptop screen size to view</h1>
      <div className="container">
        <AddSong />
        <Playlist />
      </div>
    </ApolloProvider>
  )
}