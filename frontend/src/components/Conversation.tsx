import { useState } from "react";
import styles from './Conversation.module.css';
import { Thinking } from "./Thinking";

interface Message {
    id: string;
    text: string;
    sender: 'User' | 'AI';
}

export const Conversation = (props: {
    selectedTopic: string,
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: new Date().toISOString(),
            text: "Message from AI",
            sender: "AI",
        },
        {
            id: new Date().toISOString() + "1",
            text: "Message from User",
            sender: "User",
        }
    ]);

    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const [ingestingDocuments, setIngestingDocuments] = useState<boolean>(false);

    const sendUserMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = userInput;

        let finalMessages: Message[] = [
            {
                id: new Date().toISOString(),
                text: query,
                sender: "User",
            },
            ...messages,
        ];
        setMessages(finalMessages);
        setUserInput("");

        setWaitingForResponse(true);
        const rawResponse = await fetch("http://localhost:3000/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                directoryName: props.selectedTopic,
                query,
            }),
        });
        setWaitingForResponse(false);
        const response = await rawResponse.json();
        const aiResponse = response.response as string;

        finalMessages = [
            {
                id: new Date().toISOString(),
                text: aiResponse,
                sender: "AI",
            },
            ...finalMessages,
        ];
        setMessages(finalMessages);
    }

    const ingestDocuments = async () => {
        setIngestingDocuments(true);
        await fetch("http://localhost:3000/api/ingest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                directoryName: props.selectedTopic,
            }),
        });
        setIngestingDocuments(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className="heading">
                    Conversation History
                </div>
                <button onClick={() => setMessages([])}>
                    Clear Chat
                </button>
                <button onClick={() => ingestDocuments()} disabled={ingestingDocuments}>
                    {ingestingDocuments ? "Ingesting..." : "Ingest Documents"}
                </button>
            </div>
            <div className={styles.chatContainer}>
                {
                    !messages.length && (
                        <div className={styles.emptyMessage}>
                            Send a message to begin!
                        </div>
                    )
                }
                {
                    waitingForResponse && (
                        <div className={styles.waitingForResponse}>
                            <Thinking />
                        </div>
                    )
                }
                {
                    messages.map((message) => {
                        return (
                            <div
                                className={`${styles.messageParent} ${message.sender == "AI" ? styles.messageOrientationAI : styles.messageOrientationUser}`}
                                key={message.id}
                            >
                                <div className={`${styles.messageContainer} ${message.sender == "AI" ? styles.messageOrientationAI : styles.messageOrientationUser} ${message.sender == "AI" ? styles.messageColorAI : styles.messageColorUser}`}>
                                    <div className={styles.messageAvatarContainer}>
                                        {message.sender == "AI" && "🤖"}
                                    </div>
                                    <div style={{
                                        textAlign: message.sender == "AI" ? 'start' : 'end',
                                    }}>
                                        {message.text}
                                    </div>
                                    <div className={styles.messageAvatarContainer}>
                                        {message.sender == "User" && "💁‍♂️"}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <form
                className={styles.userInputForm}
                onSubmit={sendUserMessage}
            >
                <input
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                    autoComplete="off"
                    className={styles.userInput}
                />
                <button className={styles.submitButton}>
                    Send!
                </button>
            </form>
        </div>
    )
}