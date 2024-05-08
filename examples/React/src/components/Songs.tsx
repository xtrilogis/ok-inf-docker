import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { AddSongForm } from "./AddSongForm";
import { SongItem } from "./SongItem";

{/**useState managing local state, useEffect perform Operations such as data fetching*/}

const SongsContext = React.createContext({
    songs: [], fetchSongs: () => {}
})

{/**Fetch Song information from FastAPI 'Server' */}
export default function Songs(){
    const [songs, setSongs] = useState([]);
    const fetchSongs = async () => {
        const response = await fetch("http://localhost:8000/song/get")
        const songs = await response.json()
        setSongs(songs.data)
        return songs.data
    }
    
    useEffect(() => {
        fetchSongs()
    }, [])

    const divStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "10vh",
    };

    return (
        <SongsContext.Provider value={{songs, fetchSongs}}>
          <Stack spacing={5}>
            {songs.map((song: any, idx) => (
              <SongItem item={song} id={song.id} fetchSongs={fetchSongs} />
            ))}
          </Stack>
          <div style={divStyle}>
            <AddSongForm fetchSongs={fetchSongs}/>
          </div>
        </SongsContext.Provider>
      )
}
