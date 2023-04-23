import express from 'express';
import { getTopics, ingest, query } from './services/Service';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/topics", getTopics);
app.post("/api/ingest", ingest);
app.post("/api/query", query);

export default app;
