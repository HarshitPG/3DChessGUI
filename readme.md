# How to start the server?

## Build the Docker Image:

    docker build -t flask-chess-app .

## Run the Docker Container:

    docker run -p 5000:5000 flask-chess-app

# How to start the client?

cd to client folder

    npm run dev

## Note:

Make sure the backend api is in localjost before testing it in localhost. cd to context folder and check the gamecontext.jsx file for the api link and make the req changes.
live backend api:
https://flask-chess-app-latest.onrender.com/
https://flask-chess-app-latest.onrender.com/make_move
