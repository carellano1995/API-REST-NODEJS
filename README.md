API-REST-NODEJS
===========

Api rest with NodeJS

![spring|java](https://cdn-images-1.medium.com/max/1200/1*fsseXIPGEhwmg6kfgXyIjA.jpeg)

## Requirements

- NodeJS 10+
- NPM
- PostMan
- Visual Studio Code or another similar IDE (Sublime, Atom, etc ...)
- Mongo DB
- GIT
- Terminal (ITERM con plugins oh my zsh)

### Plugins

Some plugins that use in Visual Studio Code are:

| Plugin                                    |
| ----------------------------------------- |
| Trailing spaces                           |
| Prettier - Code formatter                 |
| Path intellisense                         |
| Prettier - Code formatter                 |
| NPM                                       |
| Code metrics                              |

## Set up MONGO DB

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" (install homebrew)
$ brew tap mongodb/brew
$ brew install mongodb-community@4.0
$ mongod
```

### Installation

API-REST-NODEJS requires [Node JS](https://nodejs.org/es/) 10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/carellano1995/API-REST-NODEJS.git
$ cd API-REST-NODEJS/
$ npm install
$ node server.js
```

# Controllers

### GET[/players]

This endpoint will return a list with all the paged records.

#### Request

```json
url: http://localhost:8000/players
method: GET
headers : {Content-Type : application/json}
```

If successful, it will return a status **200** and the following JSON:

```json
{
    "results": [
    ],
    "count": 0,
    "pageSize": 10,
    "currentPage": 1,
    "pageCount": 1
}
```

### GET ALL[/players/all]

This endpoint will return a list with all records.

```json
url: http://localhost:8000/players/all
method: GET
headers : {Content-Type : application/json}
```

If successful, it will return a status **200** and the following JSON:

```json
[]
```

### POST[/players]

This endpoint will allow to create a player.

#### Request

```json
url: http://localhost:8080/players
method: POST
headers : {Content-Type : application/json}
body: {
	"name": "Cristiano Ronaldo",
	"rut": "20320983-5"
}
```

If successful, it will return a status **200** and the following JSON:

```json
{
    "_id": "5cda2bc2d30edff86b618d55",
    "name": "Cristiano Ronaldo",
    "rut": "20320983-5",
    "createdAt": "2019-05-14T02:45:22.226Z",
    "updatedAt": "2019-05-14T02:45:22.226Z",
    "__v": 0
}
```

### PUT[/players/{id}]

This endpoint will allow to update a player.

#### Request

```json
url: http://localhost:8000/players/{id}
method: PUT
headers : {Content-Type : application/json}
body: {
	"name": "Cristiano R.",
	"rut": "20320983-5"
}
```

If successful, it will return a status **200** and the following JSON:

```json
{
  "id": 1,
  "name": "Cristiano R.",
  "rut": "20320983-5"
}
```

### Delete[/players/{id}]

This endpoint will allow to eliminate a player.

#### Request

```json
url: http://localhost:8000/players/{id}
method: DELETE
headers : {Content-Type : application/json}
```

If successful, it will return a status **200**.
