# Leantegra RTLS player


This tool enables playing different sequences of RTLS coordinates for comparison, testing and algorithm research.

The RTLS player works fully inside Docker and keeps node_modules inside Docker image as well. No need to run `npm i` to install the modules locally.

The node process inside Docker container is run using `node` user (uid=guid=1000), so if you bind volumes to container all files created inside container will be owned by the user with uid=1000 on your host.

## Screenshot

![Screenshot](rtls_player_screenshot.png)

## Useful commands

```
docker-compose up
docker-compose up --build
docker-compose build
docker-compose exec --user=node player bash
./bin/player_shell
docker-compose -f docker-compose.prod.yml up -d,
docker-compose -f docker-compose.prod.yml logs
```

Please add new npm modules inside container only:

```
./bin/player_shell yarn add my-module
```

## BSD License

Copyright (c) 2017-2019 Leantegra Inc.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
