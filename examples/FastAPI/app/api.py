from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from pydantic import TypeAdapter
import json
from pathlib import Path
from pydantic.json import pydantic_encoder


app = FastAPI()
DB_PATH = Path(__file__).parent / "songs.json"

class Song(BaseModel):
    id: int
    title: str
    artist: str
    year: int

def read_song_db() -> List[Song]:
    
    with open(DB_PATH, 'r') as file:
        data = json.load(file)

    return TypeAdapter(List[Song]).validate_python(data)

def update_song_db(songs: List[Song]):
    with open(DB_PATH, 'w') as file:
        file.write(json.dumps(songs, default=pydantic_encoder))



origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:1337",
    "localhost:1337"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your song list."}


@app.get("/song/get", tags=["songs"])
async def get_songs() -> dict:
    return { "data": read_song_db()}


@app.post("/song/add", tags=["songs"])
async def add_song(song: Song) -> dict:
    songs: List[Song] = read_song_db()
    if songs:
        last_id: int = max([item.id for item in songs])
    else:
        last_id: int = 1
    song.id = last_id + 1
    songs.append(song)
    update_song_db(songs=songs)
    return { "data": { "Song added" } }


@app.delete("/song/{id}", tags=["songs"])
async def delete_song(id: int) -> dict:
    message: str = f"Song with id {id} not found."
    songs = read_song_db()
    for song in songs:
        if int(song.id) == id:
            songs.remove(song)
            message = f"Song with id {id} has been removed."
            update_song_db(songs=songs)
            break
    return { "data": message }
