import { Request, Response } from "express";
import { readdirSync } from 'fs';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";

const baseDirectoryPath = `${__dirname}/../documents`;

export async function ingest(req: Request, res: Response) {
    const { directoryName } = req.body;

    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPEN_AI_API_KEY,
    });

    const loader = new DirectoryLoader(
        `${baseDirectoryPath}/${directoryName}/docs`,
        {
            ".txt": (path) => new TextLoader(path),
            ".pdf": (path) => new PDFLoader(path),
            ".md": (path) => new TextLoader(path),
        }
    );

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const splitDocs = await textSplitter.splitDocuments(docs);

    const vectorStore = await HNSWLib.fromDocuments(splitDocs, embeddings);
    await vectorStore.save(`${baseDirectoryPath}/${directoryName}/index/data`);

    return res.status(200).json({ status: "Done" });
}

export async function query(req: Request, res: Response) {
    const { directoryName, query } = req.body;

    const model = new OpenAI({
        openAIApiKey: process.env.OPEN_AI_API_KEY,
        maxTokens: -1,
        temperature: 1,
    });
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPEN_AI_API_KEY,
    });

    const vectorStore = await HNSWLib.load(`${baseDirectoryPath}/${directoryName}/index/data`, embeddings);

    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

    const response = await chain.call({ query });

    return res.status(200).json({
        response: response.text.trim(),
    })
}

export async function getTopics(req: Request, res: Response) {
    const names = readdirSync(baseDirectoryPath, { withFileTypes: true })
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name);

    return res.status(200).json({
        response: names
    });
}