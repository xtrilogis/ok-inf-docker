import { Box, Button, Flex, Text } from "@chakra-ui/react";

export function SongItem({item, id, fetchSongs}: {item: any, id: any, fetchSongs: any }){
    const deleteSong = async () => {
        await fetch("http://localhost:8000/song/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ "id": id })
        })   
        await fetchSongs()
    }

    return (
        <Box p={1} shadow="sm">
            <Flex justify="space-between">
                <Text mt={4} as="div">
                    <b>Title:</b> {item.title} | <b>Artist:</b> {item.artist} | <b>Year:</b> {item.year}
                    <Flex align="end">
                        <Button bg="blue.200" h="1.5rem" size="sm" onClick={deleteSong}>Delete Song</Button>
                    </Flex>
                </Text>
            </Flex>
        </Box>
    )
}