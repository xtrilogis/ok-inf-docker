# Code Tour as Markdown
      
## FROM instruction
Set the baseImage to use for subsequent instructions. FROM must be the first instruction in a Dockerfile. (Except for ARG)


```Dockerfile
FROM baseImage
FROM baseImage:tag
FROM baseImage@digest
```
              
## ARG instruction
Define a variable with an optional default value that users can override at build-time when using docker build.
```Dockerfile
ARG userName
ARG testOutputDir=test
```

Beispiel:
```Dockerfile
ARG VERSION
FROM ubuntu:VERSION
```

`$ docker build --build-arg VERSION=22.04 my_image` # sonst Fehler
            
## LABEL instruction

Add Metadata

Beispiel: `LABEL version="1.0"`
 
## ENV instruction
Set environment variables. Can also be set at runtime with `--env` or `-e`

Unterschied zu ARG: ARG ist nur zur buildtime verfügbar, ENV existiert als Umgebungsvariable im fertigen Image
  
## USER Instruction
Set the user used for following CMD, ENTRYPOINT or RUN instructions, as well as the user when running the image
    
## WORKDIR instruction

Set the working directory for any subsequent instructions as well as for later when running the image
- `WORKDIR` affects `RUN, CMD, ENTRYPOINT, COPY, ADD`
- `WORKDIR` can be adjusted several time, but is executed relative to the previous value
```Dockerfile
WORKDIR /path/to/workdir
WORKDIR relative/path
```

Beispiel:
```Dockerfile
WORKDIR /etc/
WORKDIR user/app
```

## COPY instruction

The COPY instruction copies new files or directories from \<src\> and adds them to the filesystem of the container at the path \<dest\>.

If source or destination contains whitespaces enclose it with \"

```dockerfile
COPY test.txt relativeDir/
COPY test.txt /absoluteDir/
COPY hom* /mydir/
```
## ADD instruction

The ADD instruction copies new files, directories or remote file URLs from <src> and adds them to the filesystem of the image at the path <dest>.

```dockerfile
ADD hom* /mydir/
ADD git@git.example.com:foo/bar.git /bar
```
### ADD vs. COPY

ADD: has more features link copying from remote sources or automatically unpackung a compressed source

Best Practice: Use COPY for moste of the copying and ADD only for tasks that require ADD features

## RUN instruction

The RUN instruction will execute any commands to create a new layer on top of the current image. The added layer is used in the next step in the Dockerfile

```dockerfile
# Shell form:
RUN [OPTIONS] <command> ...
# Exec form:
RUN [OPTIONS] [ "<command>", ... ]
```
Beispiel:
```dockerfile
RUN apt-get update -y
RUN --mount=type=cache,target=/root/.cache/go-build \\
  go build ...
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
```
      
## EXPOSE instruction

The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime. 

- `EXPOSE` alone does not enable the container to be accessed through that port add `-p/--publish` to the `docker run`command. It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published.
- `expose` tells the container to expect communication through that port
- `publish` connects the exposed port to a port in the external world, opens the port for usage

```dockerfile
EXPOSE 80/udp
EXPOSE 80/tcp
```
      
## SHELL instruction

Ermöglicht das Überschreiben der Default Shell für Shell Befehle. Normal `["/bin/sh", "-c"]`

```dockerfile
# Executed as powershell -command Write-Host hello
SHELL ["powershell", "-command"]
RUN Write-Host hello

# Executed as cmd /S /C echo hello
SHELL ["cmd", "/S", "/C"]
RUN echo hello
```
      
## ENTRYPOINT instruction

An ENTRYPOINT allows you to configure a container that will run as an executable

```dockerfile
# exec from
ENTRYPOINT ["executable", "param1", "param2"]
# shell form
ENTRYPOINT command param1 param2
```
Beispiel:
```dockerfile
ENTRYPOINT ["echo", "Hello World"]
```
      
## CMD instruction

The CMD instruction sets the command to be executed when running a container from an image.

```dockerfile
# exec from
CMD ["executable","param1","param2"]
# shell form
CMD command param1 param2
```
Beispiel
```dockerfile
CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "80"]
CMD echo Hello Students
```
  
### CMD vs. ENTRYPOINT

- beide definieren den, was nach Container start ausgeführt wird
- `CMD` kann überschrieben werden
- `ENTRYPOINT` bestimmt den Befehl, neue Parameter werden angehangen

Weitere Beispiele, instructions https://docs.docker.com/reference/dockerfile/