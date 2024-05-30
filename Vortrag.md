todo 
- [ ] example for it container
- [x] pack python swt into container
- [x] pack frontend into container
- [ ] ~~add sql dep~~
- [ ] ~~add db container~~
- [ ] list up Question the Lightning Talk should awnser
- [ ] Dockerignore

```query
tag:#todo  path:Docs/Container
```
Outline
- [ ] Quickstart (Motivation, kleiner Überblick?) vgl. [[#Quick Start]] 
- [ ] Wichtige Begriffe (Container, Images)
- [ ] Beispiel: `docker run hello world`
- [ ] `docker run` erklären und wichtige Flags
	- [ ] Überleitung: woher kommen images? Repositorytories oder Dockerfile
- [ ] Was ist eine Dockerfile? Welche Elemente hat ein Dockerfile?
	- [ ] Einzelne Commands (RUN, COPY, ...)
	- [ ] `docker build` erklären
	- [ ] Beispiele:
		- [ ] CMD vs Entrypoint 
			- [ ] flags -t und -f erklären
			- [ ] difference between run and start
		- [ ] RUN vs RUN &&
			- [ ] docker images und docker ps -a erklären
		- [ ] Fast API Beispiel 
			- [ ] → run flags -p --rm -d und attach weitere?
			- [ ] (`docker exec` und `-it` erklären)
			- [ ] start, stop, rm
	- [ ] Tipps für effizientere Images
- [ ] Volumes
	- [ ] Überleitung: run mir --rm speichert songs nicht
	- [ ] Fast API Beispiel ausbauen, um **bind mount** zu nutzen
- [ ] Mutistage builds
	- [ ] Beispiel React erst ohne dann mit Multistage
- [ ] Docker compose
	- [ ] Python oder React bsp zu compose umwandeln → zeigen
	- [ ] dann beides in ein compose file packen
	- [ ] `docker compose build, up, down` (start, stop?)
- [ ] Docker Desktop zeigen
- [ ] Was als nächstes
	- [ ] ([GitHub - OpenDroneMap/WebODM: User-friendly, commercial-grade software for processing aerial imagery. 🛩](https://github.com/OpenDroneMap/WebODM?tab=readme-ov-file#recommended-machine-specs))
	- [ ] Kubernetes Cluser (Modelle trainieren)
	- [ ] Webseite hosten ??


Beispiele:
- Hello World
- App in Docker
- docker compose front, back and db → SWP APP mit postgres erweitern?
	- [PostgreSQL Python: Update Data in a Table (postgresqltutorial.com)](https://www.postgresqltutorial.com/postgresql-python/update/)
- kleine pyqt App erstellen (caculator) und das dann in docker container packen ?
[[#Commands]]
Commands that basically do the same thing
Aliases:
  docker container run ↔  docker run
  docker container ls, docker container list, docker container ps, docker ps
  docker image pull, docker pull
  docker image tag, docker tag
  docker image push, docker push

Quizze ideen:
- unterschied zwischen CMD und Entrypoint → Dockerfile geben und dann output erfragen
- Frage: Wie heißt der Docker Wahl? Doci Doc, Moby Doc, ...
- Frage: Build command mit custom Dockerfile Name: geht nicht, -f, ohne Flag, --file
Fragen aus der Runde:
- Docker auf Rasberry Pi [Install Docker Engine | Docker Docs](https://docs.docker.com/engine/install/) gibt eine installations datei, [Install Docker Engine on Raspberry Pi OS (32-bit) | Docker Docs](https://docs.docker.com/engine/install/raspberry-pi-os/)
- Docker Swarm
- (Docker commit im Kontext von Overleaf) [Quick Start Guide · overleaf/overleaf Wiki (github.com)](https://github.com/overleaf/overleaf/wiki/Quick-Start-Guide)
Sources:
- [100+ Docker Concepts you Need to Know (youtube.com)](https://www.youtube.com/watch?v=rIrNIzy6U_g)

Erwähnen, dass die Command Line help gut ist
[[CheatSheets] Docker Command Diagram ~ m@rcus 學習筆記 (marcus116.blogspot.com)](https://marcus116.blogspot.com/2019/03/cheatsheets-docker-commands-diagram.html)

![[dockercommand.png]]

### Examples
#todo final naming for image names
#todo stucture
here:
```
> command
expected output
```
presentation:
```
Dockerfile
---
command
- erklärung zu einzelnen teilen
ggf. output (commands werden im Terminal gezeigt)
```
#### Hello World
- [docker-library/hello-world (github.com)](https://github.com/docker-library/hello-world/tree/master)
![[Pasted image 20240327183753.png]]
#### Basics
##### examples/cmd
```dockerfile
FROM alpine

# Exec form
CMD ["echo", "Hello World."]

#shell form
CMD echo Hello Students
```
#todo check if --rm is needed
```
docker build -f .\Dockerfile.cmd -t samplecmd .
docker run --rm samplecmd

docker run --rm samplecmd echo Hallo du
```
##### examples/entry
```dockerfile
FROM alpine
ENTRYPOINT ["echo", "Hello World"]
```

```
docker build -f .\Dockerfile.entry -t sample:entry .
docker run --rm sample:entry

$ docker run sample:entry blabla
Hello World blabla
```
##### examples/entry+cmd
```dockerfile
FROM alpine

ENTRYPOINT ["echo"]
CMD ["Hello","Students."]
```

```
$ docker build -f .\Dockerfile.exec -t sample:exec .
$ docker run sample:exec blabla
blabla
```
##### RUN instruction
```
FROM ubuntu:22.04

LABEL author=HyperUser

RUN apt-get update -y \
  && apt-get upgrade -y \
  && apt-get install iputils-ping -y \
  && apt-get install net-tools -y

ENTRYPOINT ["/bin/bash"]
```

```
FROM ubuntu:22.04

LABEL author=HyperUser

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install iputils-ping -y
RUN apt-get install net-tools -y

ENTRYPOINT ["/bin/bash"]
```

![[Pasted image 20240428122834.png]]
##### Docker volumes
```
- `docker volume create mydata`
- docker run -d --name container1 -v mydata:/data 
- docker exec -it container1 sh
- touch hello.txt
- `docker run -d --name container2 -v mydata:/data busybox sleep 3600`
- `docker exec -it container2 sh`
- `cat /data/shared.txt`
- `exit`
```
#### examples/FastAPI
Normal ausführen
- [x] check year 
- [x] add volume for json
```
cd .\examples\FastAPI\
.\venv\Scripts\Activate.ps1
uvicorn app.api:app --reload
```

https://fastapi.tiangolo.com/deployment/docker/
```
FROM python:3.9

WORKDIR /code
COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
```

the code in `/app` changes often but the requiremnts mostly not → use cached requrements installation → only load code changes from scratch
The file with the package requirements **won't change frequently**. So, by copying only that file, Docker will be able to **use the cache** for that step.

And then, Docker will be able to **use the cache for the next step** that downloads and install those dependencies. And here's where we **save a lot of time**
```
docker build -t fastapiapp .
docker run -d --name mycontainer -p 80:80 fastapiapp # -p 8080:80
docker exec -it mycontainer2 bash
docker stop mycontainer2
docker start mycontainer2
```
→ good to name container to terminate ist without desktop oder ps

![[Pasted image 20240428104802.png]]

Szenario: einem Freund die App teilen
→ hochladen auf docker hub
→ die letzten zwei songs sind nicht mit dabei
→ Option 1: json anpassen, image neu erstellen
→ Option 2: changes commiten
```
docker commit mycontainer fastapiapp:v2
docker run -d --name mycontainerv2 -p 8000:80 fastapiapp:v2
# open localhost:8000/docs -> get songs hat die changes
docker run -d --name mycontainerbla --rm -p 8080:80 fastapiapp
# open localhost:8080/docs -> get songs hat keine
```
→ Option 3: Volume, wenn man die json changes behalten möchte, aber den container per se nicht
```
# Quiz: why is this not working
docker run -d --rm --name mycontainerbla -v ${PWD}/app/songs.json:/app/songs.json -p 8080:80 fastapiapp
# Note: be aware of the working directory of your app, in this case code
docker run -d --rm --name mycontainer -v ${PWD}/app/songs.json:/code/app/songs.json -p 8080:80 fastapiapp

# maybe rather use a external songs.json
```
`docker run -p 8000:4000 -v ./logs:/app/logs learn-docker` will tell Docker to use (or create) the folder logs in our terminal's current directory as the volume for the path **/app/logs** of our container
#### examples/React
#todo
```
cd .\examples\React\
npm start
```

https://mentorcruise.com/blog/how-to-dockerize-a-react-app-and-deploy-it-easily/
- multi stage build
- docker compose
#### React
https://mherman.org/blog/dockerizing-a-react-app/
- react without multi stages
- dafür als args im run command

```
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true sample:dev
```
1. `-it` otherwise react would close riight after start up
2. `--rm` remove container after start up
3. `-v ${PWD}:/app` mounts the code into the container at “/app"
4. <span class="symbols-prettifier-unclear">?unclear</span> 1. Since we want to use the container version of the “node_modules” folder, we configured another volume: `-v /app/node_modules`. You should now be able to remove the local “node_modules” flavor.
	1. - _Build_ - The `node_modules` directory is created in the image.
	2. _Run_ - The current directory is mounted into the container, overwriting the `node_modules` that were installed during the build.
5. Chokidar.. so that hot-reloading will work

\[Dockerfile.prod]
```
docker build -f Dockerfile.prod -t sample:prod .
docker run -it --rm -p 1337:80 sample:prod
```

equivalent docker composes
```yml
version: '3.7'

services:

  sample:
    container_name: sample
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - '.:/app'
      - '/app/node_modules'
    ports:
      - 3001:3000
    environment:
      - CHOKIDAR_USEPOLLING=true
```

```yml
version: '3.7'

services:

  sample-prod:
    container_name: sample-prod
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - '1337:80'
```

```
docker-compose -f docker-compose.prod.yml up -d --build
```


### Finales Docker-Compose
```yml
version: '3.7'

services:

  sample-prod:
    container_name: sample-prod
    build:
      context: ./React/
      dockerfile: Dockerfile.prod
    ports:
      - '3000:80'
  fastapi:
    container_name: backend
    build:
      context: ./FastApi/
      dockerfile: Dockerfile
    ports:
      - '8000:80'
    volumes:
      - ${PWD}/app/songs.json:/code/app/songs.json
```
### Questions
[Docker Cheat Sheet - Most Important Docker Commands (2023) (geeksforgeeks.org)](https://www.geeksforgeeks.org/docker-cheat-sheet/)
[The Ultimate Docker Cheat Sheet | dockerlabs (collabnix.com)](https://dockerlabs.collabnix.com/docker/cheatsheet/)
- ~~Difference between Run and CMD and Entry point~~
	- Run commands during build time
	- cmd & ep instantiated containers
		- cmd: only one overwritten by commands passed at runtime
		- entrypoint: not overwritten, main command
- Whats the docker deamon?
	- service which runs the  docker process
- ~~Whats a container?, Whats an image?~~
- Whats a healhcheck in the docker context
- ~~Why would you mount files? What is ist? How is it done?~~
	- ~~mount files locally `docker run -v src:target:optional` e.g. ro für read-only~~
- ~~docker buildx build vs docker build~~
- ~~unterschied zwischen copy folder and volume with a folder → volume is stored outside the container, doesn't increas container size~~
- ~~What is Mounting? What are Volumes and what is the difference~~