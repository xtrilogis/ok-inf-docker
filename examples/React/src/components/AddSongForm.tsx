import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from "@chakra-ui/react"
import { useState } from "react"

export function AddSongForm({ fetchSongs }: {fetchSongs: any}){
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [song, setSong] = useState({
      title: "",
      artist: "",
      year: 1000
    })
    const [state, setState] = useState({
      err: "",
    })
  
    const handleInput = (event: any) => {
      const value = event.target.value;
      setSong({
        ...song,
        [event.target.name]: value
      });
    }
  
    const validateInput = () => {
      if (song.title === ""){
        setState({err: "No title"})
        return false
      } else if (song.artist === ""){
        setState({err: "No artist"})
        return false
      } else if (song.year > 2100 || song.year < 1000 ){
        setState({err: "Please enter valid (4-digit) year."})
        return false
      }
      return true
    }

    const addSong = async () => {
      const newSong = {
        "id": -1,
        "title": song.title,
        "artist": song.artist,
        "year": song.year
      }

      if (validateInput()) {
        await fetch("http://localhost:8000/song/add", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(newSong)
        }).then(fetchSongs)
        onClose()
        setSong({
          title: "",
          artist: "",
          year: 1000,
        })
        await fetchSongs()
      }
    }
    return (
        <>
            <Button bg="blue.200" h="1.5rem" size="sm" onClick={onOpen}>Add new Song</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add Song</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                    <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="title"
                        aria-label="title"
                        value={song.title}
                        name="title"
                        onChange={handleInput}
                    />
                    <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="artist"
                        aria-label="artist"
                        value={song.artist}
                        name="artist"
                        onChange={handleInput}
                    />
                    <Input
                        pr="4.5rem"
                        type="number"
                        placeholder="year"
                        aria-label="year"
                        value={song.year}
                        name="year"
                        onChange={handleInput}
                    />
                    <Text>{state.err}</Text>
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button bg="blue.200" h="1.5rem" size="sm" onClick={addSong}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}