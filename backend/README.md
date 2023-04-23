### Find me here 

[<img alt="KeyStrokes" height="50px" src="../images/KeyStrokes.png" />](https://www.youtube.com/@Key_Strokes) [<img alt="KeyStrokes" height="50px" src="../images/YT.png" />](https://www.youtube.com/@Key_Strokes)

### Support me:

[<img alt="KeyStrokes" height="50px" src="../images/bmc.png" />](https://www.buymeacoffee.com/keystrokes) [<img alt="KeyStrokes" height="50px" src="../images/KoFi.png" />](https://ko-fi.com/keystrokes) [<img alt="KeyStrokes" height="50px" src="../images/Patreon.jpg" />](https://patreon.com/KeyStrokes)

# Chat App with ChatGPT API Integration: Backend
Personalize ChatGPT using LangChain, and get answers from your own documents and knowledge base.

The project uses ExpressJS.

## Video Link:

[<img alt="KeyStrokes" height="50px" src="../images/YT.png" />](https://youtu.be/han_3S2fPOU)

## Setup

1. Update `OPEN_AI_API_KEY` in `./backend/env/development.env` with your Open AI API Key.
1. Run the following commands to setup the backend

```
cd backend
npm install
```

## Start the server

Run the following command to start the server
```
npm run dev
```

## Available APIs:

### Get list of topics

`GET localhost:3000/api/topics`

Response:
```
{
    "response": [
        "Ethereum Whitepaper",
        "React Documentation",
        "Wizard of Oz"
    ]
}
```

### Ingest Documents

`POST localhost:3000/api/ingest`

Request:
```
{
    "directoryName": "Wizard of Oz"
}
```

Response:
```
{
    "status": "Done"
}
```

### Query Documents

`POST localhost:3000/api/query`

Request:
```
{
    "directoryName": "Wizard of Oz",
    "query": "Where is Dorothy?"
}
```

Response:
```
{
    "response": "Dorothy is at home in Kansas."
}
```

---

## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).


## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
